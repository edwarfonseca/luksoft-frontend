import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PromoBanner from './components/layout/PromoBanner';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import GalleryPage from './pages/GalleryPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import useThemeFromSettings from './hooks/useThemeFromSettings';

const AdminApp = lazy(() => import('./admin/AdminApp'));

function AdminFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink-200 border-t-primary-500" />
    </div>
  );
}

function PublicLayout() {
  const location = useLocation();
  const bannerRef = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  // Al montar o cambiar de ruta (sin una sección objetivo explícita), regresa al tope.
  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.state]);

  // El Navbar es fixed, así que necesita saber la altura real del banner
  // (variable según el texto y el ancho de pantalla) para no quedar encima.
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const updateHeight = () => setBannerHeight(el.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  });

  return (
    <div className="flex min-h-screen flex-col" style={{ paddingTop: bannerHeight }}>
      <PromoBanner ref={bannerRef} />
      <Navbar topOffset={bannerHeight} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  useThemeFromSettings();

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminApp />
          </Suspense>
        }
      />

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:slug" element={<CourseDetail />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/preguntas-frecuentes" element={<FaqPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
