import { useEffect } from 'react';
import useSettings from './useSettings';
import { applyTheme } from '../lib/themeRuntime';

/** Aplica los colores de marca guardados en `settings` apenas se cargan. */
export default function useThemeFromSettings() {
  const { settings } = useSettings();
  const primaryColor = settings.theme?.primaryColor;
  const secondaryColor = settings.theme?.secondaryColor;

  useEffect(() => {
    if (primaryColor || secondaryColor) {
      applyTheme({ primaryColor, secondaryColor });
    }
  }, [primaryColor, secondaryColor]);
}
