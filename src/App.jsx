import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import GalleryPage from './pages/GalleryPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
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

  // Al montar o cambiar de ruta (sin una sección objetivo explícita), regresa al tope.
  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.state]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
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
        <Route path="/cursos/:slug" element={<CourseDetail />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
