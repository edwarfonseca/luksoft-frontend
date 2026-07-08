import { useEffect } from 'react';

/** Modal simple de imagen ampliada, cerrable con el botón, click fuera o Escape. */
export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-3xl" onClick={(event) => event.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg text-white hover:bg-white/25"
        >
          ✕
        </button>
        <img src={item.imageUrl} alt={item.title} className="max-h-[75vh] w-full rounded-2xl object-cover shadow-2xl" />
        {(item.title || item.description) && (
          <div className="mt-4 text-center text-white">
            {item.title && <p className="font-semibold">{item.title}</p>}
            {item.description && <p className="mt-1 text-sm text-white/75">{item.description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
