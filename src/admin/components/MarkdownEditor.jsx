import { useRef, useState } from 'react';
import { renderMarkdown } from '../../lib/markdown';
import { apiClient } from '../../lib/apiClient';

const Icon = {
  Link: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.3 5.2a3.5 3.5 0 0 1 5 5L16 11.5" />
      <path d="M13 17.5 11.7 18.8a3.5 3.5 0 0 1-5-5L8 12.5" />
    </svg>
  ),
  BulletList: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 6h9M9.5 12h9M9.5 18h9" />
    </svg>
  ),
  NumberedList: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <text x="2.5" y="8" fontSize="6" fill="currentColor" stroke="none">1</text>
      <text x="2.5" y="14" fontSize="6" fill="currentColor" stroke="none">2</text>
      <text x="2.5" y="20" fontSize="6" fill="currentColor" stroke="none">3</text>
      <path d="M9.5 6h9M9.5 12h9M9.5 18h9" />
    </svg>
  ),
  Quote: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h4v5a3 3 0 0 1-3 3H4" />
      <path d="M13 6h4v5a3 3 0 0 1-3 3h-1" />
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="m5 17 5-5 3 3 3-3.5 4 5.5" />
    </svg>
  ),
  Expand: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
    </svg>
  ),
  Collapse: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5" />
    </svg>
  ),
};

function ToolbarButton({ onClick, title, children, className = '' }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-800 ${className}`}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <div className="mx-1 h-5 w-px flex-shrink-0 self-center bg-ink-200" />;
}

/** Envuelve o inserta texto en la posición del cursor/selección del textarea y conserva el foco. */
function wrapSelection(textarea, before, after, placeholder, onChange) {
  const { value, selectionStart: start, selectionEnd: end } = textarea;
  const hasSelection = start !== end;
  const selected = hasSelection ? value.slice(start, end) : placeholder;
  const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
  onChange(newValue);
  requestAnimationFrame(() => {
    textarea.focus();
    const selectFrom = start + before.length;
    const selectTo = selectFrom + selected.length;
    textarea.setSelectionRange(hasSelection ? selectTo : selectFrom, selectTo);
  });
}

/** Aplica (o quita, si ya está) un prefijo a cada línea del bloque seleccionado. */
function toggleLinePrefix(textarea, makePrefix, onChange) {
  const { value, selectionStart: start, selectionEnd: end } = textarea;
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  const nextBreak = value.indexOf('\n', end > start ? end - 1 : end);
  const lineEnd = nextBreak === -1 ? value.length : nextBreak;
  const block = value.slice(lineStart, lineEnd);
  const lines = block.split('\n');

  const alreadyPrefixed = lines.every((line) => !line || makePrefix(line, 0).stripped !== null);
  const newLines = lines.map((line, i) => {
    const { stripped } = makePrefix(line, i);
    if (alreadyPrefixed && stripped !== null) return stripped;
    return makePrefix(line, i).applied;
  });
  const newBlock = newLines.join('\n');
  const newValue = value.slice(0, lineStart) + newBlock + value.slice(lineEnd);
  onChange(newValue);
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(lineStart, lineStart + newBlock.length);
  });
}

const bulletPrefix = (line) => {
  const match = line.match(/^(-|\*)\s/);
  return { applied: `- ${line}`, stripped: match ? line.slice(match[0].length) : null };
};

const numberedPrefix = (line, i) => {
  const match = line.match(/^\d+\.\s/);
  return { applied: `${i + 1}. ${line}`, stripped: match ? line.slice(match[0].length) : null };
};

const quotePrefix = (line) => {
  const match = line.match(/^>\s/);
  return { applied: `> ${line}`, stripped: match ? line.slice(match[0].length) : null };
};

/** Editor de Markdown: barra de formato + textarea, con vista previa renderizada en vivo al lado. */
export default function MarkdownEditor({ label, name, value, onChange }) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleChange = (newValue) => onChange(newValue);

  const run = (fn) => {
    const textarea = textareaRef.current;
    if (textarea) fn(textarea);
  };

  const handleImageFile = async (file) => {
    if (!file) return;
    const textarea = textareaRef.current;
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await apiClient.upload('/upload', formData);
      if (textarea) wrapSelection(textarea, `![`, `](${url})`, 'imagen', handleChange);
    } catch {
      // El error de subida no bloquea la edición; el usuario puede reintentar.
    } finally {
      setIsUploadingImage(false);
    }
  };

  const toolbar = (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-xl border border-b-0 border-ink-100 bg-ink-50 px-2 py-1.5">
      <ToolbarButton title="Negrita" className="font-bold" onClick={() => run((t) => wrapSelection(t, '**', '**', 'texto', handleChange))}>
        B
      </ToolbarButton>
      <ToolbarButton title="Cursiva" className="italic" onClick={() => run((t) => wrapSelection(t, '*', '*', 'texto', handleChange))}>
        I
      </ToolbarButton>
      <ToolbarButton title="Subrayado" className="underline" onClick={() => run((t) => wrapSelection(t, '<u>', '</u>', 'texto', handleChange))}>
        U
      </ToolbarButton>
      <ToolbarButton title="Tachado" className="line-through" onClick={() => run((t) => wrapSelection(t, '~~', '~~', 'texto', handleChange))}>
        S
      </ToolbarButton>

      <Separator />

      <ToolbarButton title="Enlace" onClick={() => run((t) => wrapSelection(t, '[', '](https://)', 'texto del enlace', handleChange))}>
        <Icon.Link />
      </ToolbarButton>
      <ToolbarButton title="Lista con viñetas" onClick={() => run((t) => toggleLinePrefix(t, bulletPrefix, handleChange))}>
        <Icon.BulletList />
      </ToolbarButton>
      <ToolbarButton title="Lista numerada" onClick={() => run((t) => toggleLinePrefix(t, numberedPrefix, handleChange))}>
        <Icon.NumberedList />
      </ToolbarButton>
      <ToolbarButton title="Cita" onClick={() => run((t) => toggleLinePrefix(t, quotePrefix, handleChange))}>
        <Icon.Quote />
      </ToolbarButton>

      <Separator />

      <ToolbarButton title="Código" onClick={() => run((t) => wrapSelection(t, '`', '`', 'código', handleChange))}>
        <Icon.Code />
      </ToolbarButton>
      <ToolbarButton title={isUploadingImage ? 'Subiendo...' : 'Insertar imagen'} onClick={() => !isUploadingImage && fileInputRef.current?.click()}>
        <Icon.Image />
      </ToolbarButton>

      <Separator />

      <ToolbarButton title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'} onClick={() => setIsFullscreen((v) => !v)}>
        {isFullscreen ? <Icon.Collapse /> : <Icon.Expand />}
      </ToolbarButton>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          handleImageFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </div>
  );

  const editorBody = (
    <div className={isFullscreen ? 'grid flex-1 grid-cols-2 gap-4 overflow-hidden p-4' : 'grid gap-4 sm:grid-cols-2'}>
      <textarea
        ref={textareaRef}
        name={name}
        value={value || ''}
        onChange={(event) => handleChange(event.target.value)}
        rows={isFullscreen ? undefined : 14}
        placeholder="Escribe en Markdown o usa la barra de herramientas..."
        className={`w-full resize-none rounded-b-xl border border-ink-100 px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500 ${
          isFullscreen ? 'h-full rounded-t-xl' : ''
        }`}
      />
      <div
        className={`prose prose-sm max-w-none overflow-y-auto rounded-xl border border-ink-100 bg-ink-50 p-4 text-sm text-ink-700 [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:mt-1 [&_p]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc ${
          isFullscreen ? 'h-full' : ''
        }`}
        style={isFullscreen ? undefined : { maxHeight: '20rem' }}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
      />
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[160] flex flex-col bg-white">
        <div className="flex items-center justify-between border-b border-ink-100 px-4 py-2">
          <span className="text-sm font-medium text-ink-700">{label || 'Contenido'}</span>
        </div>
        {toolbar}
        {editorBody}
      </div>
    );
  }

  return (
    <div className="sm:col-span-2">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>}
      {toolbar}
      {editorBody}
    </div>
  );
}
