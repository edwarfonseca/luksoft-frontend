import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './components/ToastProvider';
import AuthGuard from './components/AuthGuard';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CoursesAdmin from './pages/CoursesAdmin';
import TestimonialsAdmin from './pages/TestimonialsAdmin';
import BenefitsAdmin from './pages/BenefitsAdmin';
import MethodologyAdmin from './pages/MethodologyAdmin';
import StatsAdmin from './pages/StatsAdmin';
import GalleryAdmin from './pages/GalleryAdmin';
import BlogAdmin from './pages/BlogAdmin';
import FaqsAdmin from './pages/FaqsAdmin';
import SettingsAdmin from './pages/SettingsAdmin';
import LeadsAdmin from './pages/LeadsAdmin';

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cursos" element={<CoursesAdmin />} />
              <Route path="testimonios" element={<TestimonialsAdmin />} />
              <Route path="beneficios" element={<BenefitsAdmin />} />
              <Route path="metodologia" element={<MethodologyAdmin />} />
              <Route path="estadisticas" element={<StatsAdmin />} />
              <Route path="galeria" element={<GalleryAdmin />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="faq" element={<FaqsAdmin />} />
              <Route path="leads" element={<LeadsAdmin />} />
              <Route path="configuracion" element={<SettingsAdmin />} />
            </Route>
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
