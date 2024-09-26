import type { VueRenderer } from '@storybook/vue3';
import type { DecoratorFunction } from 'storybook/internal/types';

export const brand = {
  description: 'Brand',
  defaultValue: 'suite',
  toolbar: {
    title: 'Brand',
    icon: 'admin',
    items: [
      { title: 'Suite Commerce', value: 'suite', left: '⚙️' },
      { title: 'Bagy', value: 'bagy', left: '🛍️' },
      { title: 'Tray', value: 'tray', left: '🛒' },
    ],
    dynamicTitle: true,
  },
};

export const brandMode: DecoratorFunction<VueRenderer, { [x: string]: any }> = function (story, context) {
  document.documentElement.setAttribute('data-company', context.globals.brand);

  return {
    components: { story },
    template: '<story />',
  };
};
