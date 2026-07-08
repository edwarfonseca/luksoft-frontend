import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import SectionLoading from '../components/common/SectionLoading';
import BlogCard from '../components/blog/BlogCard';
import useBlogPosts from '../hooks/useBlogPosts';
import useSettings from '../hooks/useSettings';

export default function Blog() {
  const { posts, isLoading } = useBlogPosts();
  const { settings } = useSettings();
  const section = settings.section?.blog ?? {};

  return (
    <article className="pt-24">
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Link to="/" className="text-sm font-medium text-primary-600 hover:underline">
            ← Volver al inicio
          </Link>

          <SectionTitle
            align="left"
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
            <p className="text-sm text-ink-500">Todavía no hay publicaciones.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} color={index % 2 === 0 ? 'primary' : 'secondary'} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </article>
  );
}
