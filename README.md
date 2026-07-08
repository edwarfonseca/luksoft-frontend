# LuckSoft — Frontend

Landing page + panel de administración para LuckSoft, plataforma de cursos de tecnología y programación para niños y adolescentes (7 a 17 años).

Repo independiente del backend. Los otros componentes viven en:
- **API**: [`luksoft-api`](../server) — Node/Express + Supabase (PostgreSQL)
- **Bot**: [`luksoft-bot`](../bot) — WhatsApp / email

---

## Requisitos previos

- **Node.js 22+**
- **pnpm** — `npm install -g pnpm` si no está disponible

```bash
node -v   # v22.x.x o superior
pnpm -v   # 9.x o superior
```

---

## Configuración inicial

```bash
pnpm install
```

Crea `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

En desarrollo local **no hace falta** definir `VITE_API_URL` — Vite hace proxy de `/api` y `/uploads` hacia `http://localhost:4000` (ver `vite.config.js`), donde debe estar corriendo el repo `luksoft-api`. En producción, define `VITE_API_URL` apuntando al backend desplegado.

---

## Arrancar en desarrollo

```bash
pnpm dev
```

Sitio disponible en **http://localhost:5173** (requiere el backend `luksoft-api` corriendo en `:4000`).

---

## Panel de administración

Acceso: **http://localhost:5173/admin**

Desde ahí se edita sin tocar código: cursos, testimonios, beneficios, metodología, estadísticas, galería (con subida de imágenes), blog (Markdown con vista previa en vivo), FAQs y configuración general (marca, colores, textos, contacto, redes sociales). Todo el contenido vive en la base de datos del backend, no en código estático.

Credenciales de acceso: definidas por el backend (`ADMIN_USERNAME` / `ADMIN_PASSWORD` en su `.env`).

---

## Rutas del sitio público

| Ruta | Descripción |
|---|---|
| `/` | Home completo (Hero → Cursos → Beneficios → Metodología → Estadísticas → Galería → Testimonios → Blog → FAQ → Contacto) |
| `/cursos/:slug` | Detalle de un curso específico |
| `/galeria` | Galería completa de imágenes |
| `/blog` | Listado de posts publicados |
| `/blog/:slug` | Post individual renderizado en Markdown |
| `/admin` | Panel de administración (requiere login) |

---

## Build de producción

```bash
pnpm build
```

Genera `dist/`. Se puede desplegar como sitio estático en Vercel o Cloudflare Pages, configurando `VITE_API_URL` con la URL del backend desplegado.

---

## Stack tecnológico

- React 19 + Vite 8
- React Router DOM v7 (SPA con `BrowserRouter`)
- Tailwind CSS v4 (configuración CSS-first en `src/index.css`)
- Theming dinámico: la paleta de colores se sobrescribe en runtime vía variables CSS sin recompilar

---

## Estructura (`src/`)

```
src/
├── admin/              ← bundle separado (React.lazy), cargado solo en /admin
│   ├── components/     ← DataTable, FormModal, ConfirmDialog, ToastProvider...
│   ├── config/         ← resources.jsx (configuración declarativa de cada entidad)
│   ├── hooks/          ← useAuth, useCrudResource
│   └── pages/          ← Login, Dashboard, CoursesAdmin, BlogAdmin, SettingsAdmin...
├── components/
│   ├── common/         ← Button, Container, SectionTitle, Badge, FormField
│   ├── layout/         ← Navbar, Footer, navLinks.js
│   ├── courses/        ← CourseCard, CourseImage
│   └── sections/       ← Hero, Courses, Benefits, Methodology, Stats, Gallery,
│                          Testimonials, BlogTeaser, Faq, Contact
├── hooks/              ← useSettings, useCourses, useBlogPosts, useGallery...
├── lib/                ← apiClient, caseConvert, themeRuntime, markdown, slugify
├── pages/              ← Home, CourseDetail, GalleryPage, Blog, BlogPost, NotFound
├── App.jsx
├── main.jsx
└── index.css           ← tokens de tema Tailwind + paleta de marca LuckSoft
```

---

## Notas para Windows

Si Vite queda con un módulo en caché corrupto (error 404 en módulos), matar los procesos Node con PowerShell antes de relanzar:

```powershell
netstat -ano | Select-String ":5173"
Stop-Process -Id <PID> -Force
```

No usar `pkill` desde Git Bash en Windows — los PIDs de MSYS no coinciden con los PIDs nativos de Windows.
