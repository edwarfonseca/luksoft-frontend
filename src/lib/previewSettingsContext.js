import { createContext } from 'react';

/**
 * Cuando está presente (solo dentro del admin), `useSettings()` devuelve
 * estos valores en lugar de los persistidos en el backend — así el admin
 * puede previsualizar cambios en los componentes reales antes de guardar.
 */
export const PreviewSettingsContext = createContext(null);
