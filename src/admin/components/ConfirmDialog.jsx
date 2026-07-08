/** Modal de confirmación reutilizado antes de cualquier eliminación en el admin. */
export default function ConfirmDialog({ open, title, description, confirmLabel = 'Eliminar', onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-900/50 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
        {description && <p className="mt-2 text-sm text-ink-600">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
