import { useState } from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import FaqItem from './FaqItem';
import useFaqs from '../../hooks/useFaqs';
import useSettings from '../../hooks/useSettings';

export default function Faq() {
  const { faqs, isLoading } = useFaqs();
  const { settings } = useSettings();
  const section = settings.section?.faq ?? {};
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionTitle
          eyebrow={section.eyebrow || 'Preguntas Frecuentes'}
          title={section.title || 'Todo lo que necesitas saber antes de inscribirte'}
          subtitle={section.subtitle || 'Si tienes otra duda, nuestro equipo está disponible en la sección de contacto.'}
        />

        {isLoading ? (
          <SectionLoading label="Cargando preguntas frecuentes..." />
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
