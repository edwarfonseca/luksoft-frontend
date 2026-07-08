/**
 * Un único ítem de acordeón. Es controlado por el padre (FAQ.jsx)
 * para garantizar que solo una pregunta esté abierta a la vez.
 */
export default function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-ink-900">{question}</span>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={`grid overflow-hidden px-6 transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        style={{ display: 'grid' }}
      >
        <p className="overflow-hidden text-sm text-ink-600">{answer}</p>
      </div>
    </div>
  );
}
