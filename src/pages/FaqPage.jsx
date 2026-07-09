import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Faq from '../components/sections/Faq';

export default function FaqPage() {
  return (
    <article className="pt-24">
      <Container className="pt-8">
        <Link to="/" className="text-sm font-medium text-primary-600 hover:underline">
          ← Volver al inicio
        </Link>
      </Container>
      <Faq />
    </article>
  );
}
