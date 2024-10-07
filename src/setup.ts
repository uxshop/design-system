import ColorSchemeService from './services/ColorSchemeService';
import type { ComponentOptions } from 'vue';
import directives from './directives';

export const DS = {
  install: (app: ComponentOptions, params: any = {}) => {
    app.use(directives);

    if (params.detectColorScheme) {
      const colorScheme = ColorSchemeService.get();
      document.documentElement.setAttribute('data-theme', colorScheme);
    }
  },
};
