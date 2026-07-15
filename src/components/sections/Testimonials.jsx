import { useCallback, useEffect, useState } from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import useTestimonials from '../../hooks/useTestimonials';
import useSettings from '../../hooks/useSettings';

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const { testimonials, isLoading } = useTestimonials();
  const { settings } = useSettings();
  const section = settings.section?.testimonios ?? {};

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (testimonials.length === 0) return;
      setActiveIndex((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Autoplay del carrusel, pausado mientras el usuario interactúa con él.
  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, goNext, testimonials.length]);

  if (!isLoading && testimonials.length === 0) return null;

  return (
    <section id="testimonios" className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Testimonios'}
          title={section.title || 'Lo que dicen estudiantes y familias'}
          subtitle={
            section.subtitle || 'Historias reales de niños y adolescentes que descubrieron su pasión por la tecnología.'
          }
        />

        {isLoading ? (
          <SectionLoading label="Cargando testimonios..." />
        ) : (
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <figure key={testimonial.id} className="w-full shrink-0 px-2">
                    <div className="flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-md ring-1 ring-ink-100 sm:p-10">
                      <span className="text-5xl" aria-hidden="true">
                        {testimonial.avatar}
                      </span>
                      <div className="mt-3 text-secondary-500" aria-hidden="true">
                        {'★'.repeat(testimonial.rating)}
                      </div>
                      <blockquote className="mt-4 text-base text-ink-700 sm:text-lg">
                        “{testimonial.quote}”
                      </blockquote>
                      <figcaption className="mt-5">
                        <p className="font-semibold text-ink-900">{testimonial.name}</p>
                        <p className="text-sm text-ink-500">{testimonial.role}</p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>

            <button
              onClick={goPrev}
              aria-label="Testimonio anterior"
              className="absolute top-1/2 -left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-600 shadow-md hover:bg-primary-50 sm:-left-5"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Siguiente testimonio"
              className="absolute top-1/2 -right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-600 shadow-md hover:bg-primary-50 sm:-right-5"
            >
              ›
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => goTo(index)}
                  aria-label={`Ir al testimonio ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'w-7 bg-primary-500' : 'w-2.5 bg-ink-100'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
