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
    { key: 'category', label: 'Tipo' },
    { key: 'duration', label: 'Duración' },
    { key: 'featured', label: 'Destacado', type: 'boolean' },
  ],
  emptyItem: {
    title: '',
    coverImageUrl: '',
    icon: '🎓',
    color: 'primary',
    ageRange: '',
    category: '',
    duration: '',
    level: 'Principiante',
    shortDescription: '',
    longDescription: '',
    highlights: [],
    projects: [],
    featured: false,
    totalSessions: '',
    sessionLength: '',
    totalXp: '',
    syllabus: [],
    badges: [],
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
    { name: 'ageRange', label: 'Rango de edad', type: 'text', placeholder: 'Ej: 7-9 años', required: true },
    {
      name: 'category',
      label: 'Tipo de curso',
      type: 'text',
      placeholder: 'Ej: Programación, Robótica, Diseño de Videojuegos',
      hint: 'Se usa como filtro en la página de Cursos.',
    },
    { name: 'duration', label: 'Duración', type: 'text', placeholder: 'Ej: 8 semanas', required: true },
    { name: 'level', label: 'Nivel', type: 'text', placeholder: 'Ej: Principiante' },
    { name: 'shortDescription', label: 'Descripción corta (en la tarjeta)', type: 'textarea', required: true },
    { name: 'longDescription', label: 'Descripción larga (página del curso)', type: 'textarea', required: true },
    { name: 'highlights', label: 'Lo que aprenderá (un punto por línea)', type: 'list' },
    { name: 'projects', label: 'Proyectos que construirá (uno por línea)', type: 'list' },
    { name: 'featured', label: 'Destacar este curso en la home', type: 'checkbox' },
    {
      name: 'totalSessions',
      label: 'Número total de clases',
      type: 'number',
      placeholder: 'Ej: 40',
      hint: 'Se muestra en la página del curso como parte de la estructura del programa.',
    },
    {
      name: 'sessionLength',
      label: 'Duración de cada clase',
      type: 'text',
      placeholder: 'Ej: 90 minutos',
    },
    {
      name: 'totalXp',
      label: 'XP total del curso (gamificación)',
      type: 'number',
      placeholder: 'Ej: 2480',
      hint: 'Suma del XP de todas las unidades/periodos del curso.',
    },
    {
      name: 'syllabus',
      label: 'Plan de estudio (un periodo/unidad por línea)',
      type: 'list',
      rows: 6,
      placeholder: 'Ej: Periodo 1 — Descubriendo Scratch: primeros pasos con bloques y personajes',
      hint: 'Cada línea es una unidad temática del temario, en orden. Se muestra como línea de tiempo en la página del curso.',
    },
    {
      name: 'badges',
      label: 'Insignias que desbloqueará (una por línea)',
      type: 'list',
      rows: 6,
      placeholder: 'Ej: 🐱 Explorador de Scratch',
      hint: 'Incluye el emoji seguido del nombre de la insignia, en el orden en que se desbloquean.',
    },
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

export const ageGroupsResource = {
  endpoint: '/age-groups',
  label: 'Grupos de edad',
  itemLabel: 'Grupo de edad',
  description: 'Rangos de edad usados como filtro en /cursos, cada uno con su mensaje de ventajas.',
  searchPlaceholder: 'Buscar por rango...',
  orderable: true,
  columns: [{ key: 'label', label: 'Rango de edad' }],
  emptyItem: { label: '', advantageMessage: '' },
  fields: [
    { name: 'label', label: 'Rango de edad (debe coincidir con el de los cursos)', type: 'text', placeholder: 'Ej: 7-9 años', required: true },
    { name: 'advantageMessage', label: 'Mensaje de ventajas de aprender a esta edad', type: 'textarea', rows: 3, required: true },
  ],
};
