import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import SectionLoading from '../components/common/SectionLoading';
import GalleryGrid from '../components/gallery/GalleryGrid';
import useGallery from '../hooks/useGallery';
import useSettings from '../hooks/useSettings';

export default function GalleryPage() {
  const { items, isLoading } = useGallery();
  const { settings } = useSettings();
  const section = settings.section?.galeria ?? {};

  return (
    <article className="pt-24">
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Link to="/" className="text-sm font-medium text-primary-600 hover:underline">
            ← Volver al inicio
          </Link>

          <SectionTitle
            align="left"
            eyebrow={section.eyebrow || 'Galería'}
            title={section.title || 'Momentos de nuestras clases en vivo'}
            subtitle={
              section.subtitle || 'Una mirada a cómo niños y adolescentes aprenden, crean y comparten sus proyectos.'
            }
          />

          {isLoading ? <SectionLoading label="Cargando galería..." /> : <GalleryGrid items={items} />}
        </Container>
      </section>
    </article>
  );
}
