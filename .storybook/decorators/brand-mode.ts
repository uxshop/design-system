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
  defaultValue: 'bagy',
  toolbar: {
    title: 'Brand',
    icon: 'bookmarkhollow',
    items: ['bagy', 'tray'],
    dynamicTitle: true,
  },
}
