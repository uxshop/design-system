import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import myTheme from '../ds-theme';

export function SchemeMode(story, context) {
  document.documentElement.setAttribute('data-theme', context.globals.scheme)

  return ({
    components: { story },
    template: '<story />',
  });
};

export const scheme = {
  description: 'Theme',
  defaultValue: 'light',
  toolbar: {
    title: 'Theme',
    icon: 'mirror',
    items: ['light', 'dark'],
    dynamicTitle: true,
  },
}
