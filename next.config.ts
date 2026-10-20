import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  // uncomment to deploy with Docker
  // output: 'standalone',

  // uncomment to increase build speed
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compress: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts')
export default withNextIntl(nextConfig)
