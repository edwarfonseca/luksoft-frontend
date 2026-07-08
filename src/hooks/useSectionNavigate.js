import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Permite que los enlaces del Navbar/Footer funcionen tanto en la home
 * (scroll suave a la sección) como desde cualquier otra página
 * (navega a "/" y luego hace scroll una vez montada la home).
 */
export default function useSectionNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return function goToSection(sectionId) {
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };
}
