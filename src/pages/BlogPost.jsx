import { Link, useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import SectionLoading from '../components/common/SectionLoading';
import { useBlogPostBySlug } from '../hooks/useBlogPosts';
import { renderMarkdown } from '../lib/markdown';

export default function BlogPost() {
  const { slug } = useParams();
  const { post, isLoading } = useBlogPostBySlug(slug);

  if (isLoading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center pt-32">
        <SectionLoading label="Cargando publicación..." />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
        <span className="text-5xl" aria-hidden="true">
          🔍
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-ink-900">Publicación no encontrada</h1>
        <p className="mt-2 text-ink-600">El artículo que buscas no existe o fue movido.</p>
        <Link to="/blog" className="mt-6 font-semibold text-primary-600 hover:underline">
          Volver al blog
        </Link>
      </Container>
    );
  }

  return (
    <article className="pt-24">
      {post.coverImageUrl && (
        <div className="h-64 w-full overflow-hidden sm:h-80">
          <img src={post.coverImageUrl} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}

      <Container className="max-w-3xl py-12">
        <Link to="/blog" className="text-sm font-medium text-primary-600 hover:underline">
          ← Volver al blog
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-ink-900 sm:text-4xl">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-2 text-sm text-ink-500">
            {new Date(post.publishedAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}

        <div
          className="prose prose-ink mt-8 max-w-none text-ink-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:mt-1 [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mt-4 [&_ul]:ml-5 [&_ul]:list-disc [&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ink-600"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.contentMarkdown) }}
        />
      </Container>
    </article>
  );
}
