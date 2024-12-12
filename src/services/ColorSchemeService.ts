export enum ColorScheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export default {
  get() {
    const system =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ColorScheme.DARK
        : ColorScheme.LIGHT;
    return localStorage.getItem('ds_color_scheme') ?? system;
  },
};
