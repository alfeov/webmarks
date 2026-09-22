// example, set in script tag in header
// more details: https://nextjs.org/docs/app/guides/preventing-flash-before-hydration#themes

// (function () {
//   try {
//     const storedTheme = localStorage.getItem(${themeKey}) ?? 'system'
//     const isPreferredDarkTheme = window.matchMedia(
//       '(prefers-color-scheme: dark)',
//     ).matches
//     const isCurrentThemeDark =
//       storedTheme === 'system' ? isPreferredDarkTheme : storedTheme === 'dark'

//     const root = window.document.documentElement
//     root.classList.toggle('dark', isCurrentThemeDark)
//   } catch (e) {}
// })()
