import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Container from '../components/common/Container';

export default function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center pt-24 text-center">
      <span className="text-6xl" aria-hidden="true">
        🛰️
      </span>
      <h1 className="mt-4 text-3xl font-bold text-ink-900">Página no encontrada</h1>
      <p className="mt-3 max-w-md text-ink-600">
        Parece que esta página se perdió en el espacio. Volvamos al inicio para seguir explorando los cursos.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg" className="mt-8">
        Volver al inicio
      </Button>
    </Container>
  );
}
