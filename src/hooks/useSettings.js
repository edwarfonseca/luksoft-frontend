import { useContext, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient';
import { PreviewSettingsContext } from '../lib/previewSettingsContext';
import { groupSettings } from '../lib/settingsShape';

/**
 * Configuración global del sitio (hero, contacto, redes, marca, colores,
 * textos de cada sección). Dentro del admin, si hay un `PreviewSettingsContext`
 * activo, se devuelven esos valores en edición en lugar de los persistidos
 * — así los componentes públicos reales sirven de vista previa en vivo.
 */
export default function useSettings() {
  const override = useContext(PreviewSettingsContext);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (override) return;
    apiClient
      .get('/settings')
      .then((flat) => setSettings(groupSettings(flat)))
      .catch(() => setSettings({}))
      .finally(() => setIsLoading(false));
  }, [override]);

  return { settings: override ?? settings ?? {}, isLoading: override ? false : isLoading };
}
