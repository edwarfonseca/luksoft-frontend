import { renderMarkdown } from '../../lib/markdown';

/** Editor de Markdown simple: textarea + vista previa renderizada en vivo, lado a lado. */
export default function MarkdownEditor({ label, name, value, onChange }) {
  return (
    <div className="sm:col-span-2">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>}
      <div className="grid gap-4 sm:grid-cols-2">
        <textarea
          name={name}
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          rows={14}
          placeholder="Escribe en Markdown: ## Subtítulo, **negrita**, - lista..."
          className="w-full rounded-xl border border-ink-100 px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-primary-500"
        />
        <div
          className="prose prose-sm max-w-none overflow-y-auto rounded-xl border border-ink-100 bg-ink-50 p-4 text-sm text-ink-700 [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:mt-1 [&_p]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc"
          style={{ maxHeight: '20rem' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      </div>
    </div>
  );
}
