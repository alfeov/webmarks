type Theme = 'system' | 'dark' | 'light'

export const isPreferredDarkTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches

export const isThemeDark = (theme: Theme) =>
  theme === 'system' ? isPreferredDarkTheme() : theme === 'dark'
