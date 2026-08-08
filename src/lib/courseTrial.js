// Cursos con una clase de prueba automatizada interactiva (app aparte,
// subdominio app.lucksoftacademy.com). Se identifica por coincidencia en el
// slug para no depender de que el slug sea exactamente igual al de la prueba.
const TRIAL_URLS = {
  scratch: 'https://app.lucksoftacademy.com/prueba-scratch',
  python: 'https://app.lucksoftacademy.com/prueba-python',
};

export function getCourseTrialUrl(slug) {
  const key = Object.keys(TRIAL_URLS).find((k) => slug?.includes(k));
  return key ? TRIAL_URLS[key] : null;
}
