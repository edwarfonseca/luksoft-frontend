import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Benefits from '../components/sections/Benefits';
import Methodology from '../components/sections/Methodology';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';

export default function AboutPage() {
  return (
    <article className="pt-24">
      <Container className="pt-8">
        <Link to="/" className="text-sm font-medium text-primary-600 hover:underline">
          ← Volver al inicio
        </Link>
      </Container>
      <Benefits />
      <Methodology />
      <Stats />
      <Testimonials />
    </article>
  );
}
