import { useRef, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import useHtmlDoc from '../../hooks/useHtmlDoc';

/** Subida de un archivo HTML de animación (ej. para el Hero), con preview en iframe. */
export default function HtmlAnimationUploader({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const { html: previewHtml } = useHtmlDoc(value);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await apiClient.upload('/upload', formData);
      onChange(url);
    } catch (err) {
      setError(err.message || 'No se pudo subir el archivo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>}

      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink-50 ring-1 ring-ink-100">
          {previewHtml ? (
            <iframe srcDoc={previewHtml} title="Vista previa de animación" className="h-full w-full" sandbox="allow-scripts" />
          ) : (
            <span className="text-2xl text-ink-300" aria-hidden="true">
              🎞️
            </span>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 disabled:opacity-60"
          >
            {isUploading ? 'Subiendo...' : value ? 'Cambiar animación' : 'Subir animación (.html)'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="ml-2 text-sm font-medium text-red-500 hover:underline"
            >
              Quitar
            </button>
          )}
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".html,text/html"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
    </div>
  );
}
