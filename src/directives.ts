import type { ComponentOptions } from 'vue';
import tooltip from './directives/tooltip';

export default {
  install: (app: ComponentOptions) => {
    app.directive('Tooltip', tooltip);
  },
};
