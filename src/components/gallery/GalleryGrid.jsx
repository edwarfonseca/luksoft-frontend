import { useState } from 'react';
import Lightbox from '../common/Lightbox';
import Reveal from '../common/Reveal';

/** Grid de imágenes reutilizado tanto en la sección de la home como en /galeria. */
export default function GalleryGrid({ items }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 50}>
            <button
              onClick={() => setSelected(item)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-ink-100"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {item.title && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent px-3 py-2 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.title}
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
