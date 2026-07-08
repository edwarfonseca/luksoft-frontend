/** Convierte el key-value plano ("hero.title", "section.courses.eyebrow") en un objeto anidado. */
export function groupSettings(flat) {
  const grouped = {};
  Object.entries(flat).forEach(([key, value]) => {
    const parts = key.split('.');
    let node = grouped;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        node[part] = value;
      } else {
        node[part] = node[part] ?? {};
        node = node[part];
      }
    });
  });
  return grouped;
}
