import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import BlogCard from '../blog/BlogCard';
import useBlogPosts from '../../hooks/useBlogPosts';
import useSettings from '../../hooks/useSettings';

export default function BlogTeaser() {
  const { posts, isLoading } = useBlogPosts({ pageSize: 3, page: 1 });
  const { settings } = useSettings();
  const section = settings.section?.blog ?? {};

  return (
    <section id="blog" className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Blog'}
          title={section.title || 'Noticias y novedades de LuckSoft'}
          subtitle={
            section.subtitle ||
            'Consejos, historias y novedades sobre tecnología educativa para niños y adolescentes.'
          }
        />

        {isLoading ? (
          <SectionLoading label="Cargando publicaciones..." />
        ) : posts.length === 0 ? (
          <p className="text-center text-sm text-ink-500">Muy pronto compartiremos nuestras primeras noticias.</p>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={index * 80}>
                  <BlogCard post={post} color={index % 2 === 0 ? 'primary' : 'secondary'} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button as={Link} to="/blog" variant="outline" size="md">
                Ver todas las noticias
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
