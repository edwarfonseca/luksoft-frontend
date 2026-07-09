import { useEffect, useState } from 'react';

/**
 * Descarga el contenido de un archivo HTML como texto para inyectarlo vía
 * iframe.srcDoc. Necesario porque Supabase Storage sirve los .html subidos
 * con Content-Type: text/plain (medida de seguridad de la plataforma), así
 * que un <iframe src="..."> directo solo muestra el código fuente.
 */
export default function useHtmlDoc(url) {
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean(url));

  useEffect(() => {
    if (!url) {
      setHtml('');
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.text();
      })
      .then((text) => { if (!cancelled) setHtml(text); })
      .catch(() => { if (!cancelled) setHtml(''); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { html, isLoading };
}
