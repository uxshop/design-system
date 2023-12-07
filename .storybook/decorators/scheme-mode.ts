export function SchemeMode(story, context) {
  const targetBg = document.querySelector('.sb-show-main')
  const listTargetInDocs = document.querySelectorAll('.docs-story')
  const backgrounds = {
    dark: '#262C3A',
    light: '#F5F7FA'
  }


  document.documentElement.setAttribute('data-theme', context.globals.scheme)
  targetBg.style.backgroundColor = backgrounds[context.globals.scheme]

  listTargetInDocs.forEach(item => {
    item.style.backgroundColor = backgrounds[context.globals.scheme]
  })

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
    items: [{ title: 'Light', value: 'light', icon: 'sun' }, { title: 'Dark', value: 'dark', icon: 'moon' }],
    dynamicTitle: true,
  },
}
