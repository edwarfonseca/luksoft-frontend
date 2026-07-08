# LuckSoft — Plataforma de enseñanza

Landing page + panel de administración para LuckSoft, plataforma de cursos de tecnología y programación para niños y adolescentes (7 a 17 años), con sede en Bogotá, Colombia.

## Estructura del repositorio

```
Plataforma de enseñanza/
├── promotionPage/      ← frontend React (este directorio)
└── server/             ← backend Node/Express + SQLite
```

Ambos paquetes son independientes (dos `package.json` separados). El backend expone la API en `:4000`; Vite hace proxy de `/api` y `/uploads` hacia `:4000` en desarrollo. En producción, el backend sirve también el `dist/` estático del frontend.

---

## Requisitos previos

- **Node.js 22+** (nodejs.org)
- **pnpm** — instalar con `npm install -g pnpm` si no está disponible

Verifica:

```bash
node -v   # debe mostrar v22.x.x o superior
pnpm -v   # debe mostrar 9.x o superior
```

---

## Configuración inicial (solo la primera vez)

### 1. Backend

```powershell
cd "Plataforma de enseñanza/server"

# Instalar dependencias
pnpm install

# Aprobar el script de compilación nativa de better-sqlite3 (Windows)
pnpm approve-builds --all

# Arrancar el servidor (queda escuchando en http://localhost:4000)
node server.js
```

Al arrancar por primera vez el servidor crea automáticamente la base de datos `server/data.sqlite`, crea todas las tablas y las rellena con el contenido inicial (cursos, testimonios, FAQ, beneficios, estadísticas, metodología, galería, posts de blog y todos los textos del sitio).

### 2. Frontend (en otra terminal)

```powershell
cd "Plataforma de enseñanza/promotionPage"
pnpm install
pnpm dev
```

El sitio queda disponible en **http://localhost:5173**

---

## Arrancar el proyecto (uso diario)

Abrir **dos terminales**:

**Terminal 1 — Backend:**
```powershell
cd "Plataforma de enseñanza/server"
node server.js
```

**Terminal 2 — Frontend:**
```powershell
cd "Plataforma de enseñanza/promotionPage"
pnpm dev
```

Luego abrir **http://localhost:5173** en el navegador.

---

## Panel de administración

Acceso: **http://localhost:5173/admin**

| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `LuckSoft2026!` |

Desde el admin se puede editar sin tocar código:
- Cursos, Testimonios, Beneficios, Metodología, Estadísticas
- Galería de imágenes (con subida de archivos)
- Blog (con editor Markdown y vista previa en vivo)
- Preguntas frecuentes
- Configuración general: marca, colores, textos del Hero, contacto, redes sociales y títulos de sección

Los cambios se guardan en la base de datos SQLite y se reflejan de inmediato en el sitio público al recargar.

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

## Variables de entorno (`server/.env`)

Crear el archivo `server/.env` con este contenido (ajustar en producción):

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=LuckSoft-dev-secret-3f9a7c2e1b5d8f6a0c4e9b2d7a1f5c8e
ADMIN_USERNAME=admin
ADMIN_PASSWORD=LuckSoft2026!
NODE_ENV=development
```

En producción cambiar `JWT_SECRET` por una cadena aleatoria larga y poner `NODE_ENV=production`.

---

## Build de producción

```powershell
# 1. Compilar el frontend
cd "Plataforma de enseñanza/promotionPage"
pnpm build

# 2. Arrancar el backend (sirve también el frontend compilado)
cd "Plataforma de enseñanza/server"
node server.js
```

Con `NODE_ENV=production`, el backend sirve el `promotionPage/dist/` estático y responde la API desde el mismo proceso. El sitio queda disponible en **http://localhost:4000**.

---

## Stack tecnológico

**Frontend**
- React 19 + Vite 8
- React Router DOM v7 (SPA con BrowserRouter)
- Tailwind CSS v4 (configuración CSS-first en `src/index.css`)
- Theming dinámico: la paleta de colores se sobrescribe en runtime vía variables CSS sin recompilar

**Backend**
- Node.js + Express
- SQLite con `better-sqlite3` (sync API)
- JWT en cookie httpOnly (`SameSite=Lax`)
- `bcryptjs` para hashing de contraseñas
- `multer` para subida de imágenes

---

## Notas importantes para Windows

Si Vite queda con un módulo en caché corrupto (error 404 en módulos), matar los procesos Node con PowerShell antes de relanzar:

```powershell
# Ver qué proceso usa el puerto 5173 o 4000
netstat -ano | Select-String ":5173"
netstat -ano | Select-String ":4000"

# Matar el proceso por su PID (reemplazar 12345 por el PID real)
Stop-Process -Id 12345 -Force
```

No usar `pkill` desde Git Bash en Windows — los PIDs de MSYS no coinciden con los PIDs nativos de Windows.

---

## Estructura del frontend (`src/`)

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
