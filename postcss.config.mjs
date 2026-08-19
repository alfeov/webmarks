const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    '@minko-fe/postcss-pxtorem': {
      rootValue: 16,
      selectorBlackList: ['some-class'],
      propList: ['*'],
      atRules: ['media'],
      // ...
    },
  },
}

export default config
