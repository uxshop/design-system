import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import myTheme from '../ds-theme';

export function BrandMode(story, context) {
  document.documentElement.setAttribute('data-company', context.globals.brand)

  return ({
    components: { story },
    template: '<story />',
  });
};

export const brand = {
  description: 'Brand',
  defaultValue: 'suite',
  toolbar: {
    title: 'Brand',
    icon: 'admin',
    items: [
      { title: 'Suite Commerce', value: 'suite', left: '⚙️' },
      { title: 'Bagy', value: 'bagy', left: '🛍️' },
      { title: 'Tray', value: 'tray', left: '🛒' }
    ],
    dynamicTitle: true,
  },
}
