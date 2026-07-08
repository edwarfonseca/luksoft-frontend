import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import Button from '../common/Button';
import GalleryGrid from '../gallery/GalleryGrid';
import useGallery from '../../hooks/useGallery';
import useSettings from '../../hooks/useSettings';

const HOME_PREVIEW_COUNT = 8;

export default function Gallery() {
  const { items, isLoading } = useGallery();
  const { settings } = useSettings();
  const section = settings.section?.galeria ?? {};

  return (
    <section id="galeria" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Galería'}
          title={section.title || 'Momentos de nuestras clases en vivo'}
          subtitle={
            section.subtitle || 'Una mirada a cómo niños y adolescentes aprenden, crean y comparten sus proyectos.'
          }
        />

        {isLoading ? (
          <SectionLoading label="Cargando galería..." />
        ) : (
          <>
            <GalleryGrid items={items.slice(0, HOME_PREVIEW_COUNT)} />
            {items.length > 0 && (
              <div className="mt-10 text-center">
                <Button as={Link} to="/galeria" variant="outline" size="md">
                  Ver galería completa
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
