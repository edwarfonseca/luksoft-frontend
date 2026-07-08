export const coursesResource = {
  endpoint: '/courses',
  label: 'Cursos',
  itemLabel: 'Curso',
  description: 'Cursos que se muestran en la sección "Cursos" de la página principal.',
  searchPlaceholder: 'Buscar por título...',
  orderable: true,
  slugFrom: 'title',
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'ageRange', label: 'Edad' },
    { key: 'duration', label: 'Duración' },
    { key: 'featured', label: 'Destacado', type: 'boolean' },
  ],
  emptyItem: {
    title: '',
    coverImageUrl: '',
    icon: '🎓',
    color: 'primary',
    ageRange: '',
    duration: '',
    level: 'Principiante',
    shortDescription: '',
    longDescription: '',
    highlights: [],
    projects: [],
    featured: false,
  },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'coverImageUrl', label: 'Imagen del curso (opcional)', type: 'image' },
    { name: 'icon', label: 'Emoji ilustrativo (si no hay imagen)', type: 'text', placeholder: 'Ej: 🐍' },
    {
      name: 'color',
      label: 'Color de la tarjeta',
      type: 'select',
      options: [
        { value: 'primary', label: 'Azul (primario)' },
        { value: 'secondary', label: 'Ámbar (secundario)' },
      ],
    },
    { name: 'ageRange', label: 'Rango de edad', type: 'text', placeholder: 'Ej: 7 a 9 años', required: true },
    { name: 'duration', label: 'Duración', type: 'text', placeholder: 'Ej: 8 semanas', required: true },
    { name: 'level', label: 'Nivel', type: 'text', placeholder: 'Ej: Principiante' },
    { name: 'shortDescription', label: 'Descripción corta (en la tarjeta)', type: 'textarea', required: true },
    { name: 'longDescription', label: 'Descripción larga (página del curso)', type: 'textarea', required: true },
    { name: 'highlights', label: 'Lo que aprenderá (un punto por línea)', type: 'list' },
    { name: 'projects', label: 'Proyectos que construirá (uno por línea)', type: 'list' },
    { name: 'featured', label: 'Destacar este curso en la home', type: 'checkbox' },
  ],
};

export const testimonialsResource = {
  endpoint: '/testimonials',
  label: 'Testimonios',
  itemLabel: 'Testimonio',
  description: 'Opiniones que aparecen en el carrusel de la sección "Testimonios".',
  searchPlaceholder: 'Buscar por nombre...',
  orderable: true,
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'role', label: 'Rol' },
    { key: 'rating', label: 'Calificación' },
  ],
  emptyItem: { name: '', role: '', avatar: '👤', rating: 5, quote: '' },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'role', label: 'Rol (ej: Mamá de Sofía, 9 años)', type: 'text' },
    { name: 'avatar', label: 'Emoji de avatar', type: 'text', placeholder: 'Ej: 👩' },
    { name: 'rating', label: 'Calificación (1 a 5)', type: 'number', placeholder: '5' },
    { name: 'quote', label: 'Testimonio', type: 'textarea', required: true },
  ],
};

export const faqsResource = {
  endpoint: '/faqs',
  label: 'Preguntas Frecuentes',
  itemLabel: 'Pregunta',
  description: 'Preguntas y respuestas del acordeón de FAQ.',
  searchPlaceholder: 'Buscar pregunta...',
  orderable: true,
  columns: [{ key: 'question', label: 'Pregunta' }],
  emptyItem: { question: '', answer: '' },
  fields: [
    { name: 'question', label: 'Pregunta', type: 'text', required: true },
    { name: 'answer', label: 'Respuesta', type: 'textarea', required: true },
  ],
};

export const statsResource = {
  endpoint: '/stats',
  label: 'Estadísticas',
  itemLabel: 'Estadística',
  description: 'Cifras destacadas de la sección "Experiencia".',
  searchPlaceholder: 'Buscar por etiqueta...',
  orderable: true,
  columns: [
    { key: 'value', label: 'Valor' },
    { key: 'suffix', label: 'Sufijo' },
    { key: 'label', label: 'Etiqueta' },
  ],
  emptyItem: { value: 0, suffix: '+', label: '' },
  fields: [
    { name: 'value', label: 'Valor', type: 'number', required: true },
    { name: 'suffix', label: 'Sufijo (ej: +, %)', type: 'text', placeholder: '+' },
    { name: 'label', label: 'Etiqueta', type: 'text', required: true, placeholder: 'Ej: Estudiantes activos' },
  ],
};

export const benefitsResource = {
  endpoint: '/benefits',
  label: 'Beneficios',
  itemLabel: 'Beneficio',
  description: 'Tarjetas de la sección "¿Por qué LuckSoft?".',
  searchPlaceholder: 'Buscar por título...',
  orderable: true,
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'description', label: 'Descripción' },
  ],
  emptyItem: { icon: '✨', title: '', description: '' },
  fields: [
    { name: 'icon', label: 'Emoji', type: 'text', placeholder: 'Ej: 🎥' },
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
  ],
};

export const methodologyResource = {
  endpoint: '/methodology',
  label: 'Metodología',
  itemLabel: 'Paso',
  description: 'Pasos de la sección "Nuestra Metodología".',
  searchPlaceholder: 'Buscar por título...',
  orderable: true,
  columns: [
    { key: 'number', label: 'N°' },
    { key: 'title', label: 'Título' },
  ],
  emptyItem: { number: '', icon: '🧭', title: '', description: '' },
  fields: [
    { name: 'number', label: 'Número (ej: 01)', type: 'text', placeholder: '01' },
    { name: 'icon', label: 'Emoji', type: 'text', placeholder: 'Ej: 📖' },
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
  ],
};

export const galleryResource = {
  endpoint: '/gallery',
  label: 'Galería',
  itemLabel: 'Imagen',
  description: 'Fotos que aparecen en la sección y página de Galería.',
  searchPlaceholder: 'Buscar por título...',
  orderable: true,
  columns: [
    {
      key: 'imageUrl',
      label: 'Imagen',
      render: (row) =>
        row.imageUrl ? <img src={row.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" /> : '—',
    },
    { key: 'title', label: 'Título' },
  ],
  emptyItem: { imageUrl: '', title: '', description: '' },
  fields: [
    { name: 'imageUrl', label: 'Imagen', type: 'image', required: true },
    { name: 'title', label: 'Título', type: 'text' },
    { name: 'description', label: 'Descripción', type: 'textarea' },
  ],
};

export const blogResource = {
  endpoint: '/blog',
  label: 'Blog',
  itemLabel: 'Publicación',
  description: 'Noticias del blog: aparecen en la home y en /blog cuando están publicadas.',
  searchPlaceholder: 'Buscar por título...',
  slugFrom: 'title',
  publishField: 'published',
  publishTimestampField: 'publishedAt',
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'published', label: 'Publicado', type: 'boolean' },
  ],
  emptyItem: { title: '', coverImageUrl: '', excerpt: '', contentMarkdown: '', published: false },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'coverImageUrl', label: 'Imagen de portada', type: 'image' },
    { name: 'excerpt', label: 'Resumen corto (para la tarjeta)', type: 'textarea', rows: 2 },
    { name: 'contentMarkdown', label: 'Contenido (Markdown)', type: 'markdown', required: true },
    { name: 'published', label: 'Publicar (visible en el sitio público)', type: 'checkbox' },
  ],
};
