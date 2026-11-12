import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { themeScript } from '@/features/toggle-theme/lib/script'
import { ThemeToggleButton } from '@/features/toggle-theme/ui/ThemeToggleButton'
import { TEST_IDS } from '@/shared/config/testids'
import { Link } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { verifySession } from '@/shared/lib/session'
import { cn } from '@/shared/lib/utils'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Skeleton } from '@/shared/ui/skeleton'
import { Auth } from '@/widgets/auth/ui/Auth'
import { Profile } from '@/widgets/profile/ui/Profile'
import { ProfileSkeleton } from '@/widgets/profile/ui/ProfileSkeleton'
import { AppSidebar } from '@/widgets/sidebar/ui/AppSidebar'

import { Providers } from './_providers/Providers'

import '@/app/styles/index.css'

const fontExcalidraw = localFont({
  src: '../Excalifont-Regular.woff2',
  display: 'swap',
  variable: '--font-excalifont',
})

const BASE_URL = new URL(
  String(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000',
)

export const instant = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    metadataBase: BASE_URL,
    title: {
      template: '%s | WebMarks',
      default: 'WebMarks',
    },
    description: t('description'),
    keywords: [
      'bookmarks',
      'web bookmarks',
      'bookmark manager',
      'web bookmark manager',
      'online bookmark manager',
      'cloud web bookmark manager',
      'web bookmark organizer',
      'link manager',
      'link organizer',
      'tag web bookmarks',
      'organize web bookmarks with tags',
      'web bookmark folders',
      'web bookmark search',
      'fast web bookmark manager',
      'sync web bookmarks across devices',
      'cross‑device web bookmarks',
      'search meta by web bookmarks',
      'edit web bookmarks',
    ],
    authors: {
      name: 'alfeov',
      url: 'https://github.com/alfeov',
    },
    creator: 'alfeov',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    alternates: {
      canonical: '/' + locale,
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, '/' + locale]),
      ),
    },
    icons: [
      {
        url: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        url: '/icon1.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon2.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        rel: 'apple-touch-icon',
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    openGraph: {
      url: '/',
      title: 'WebMarks',
      description: t('description'),
      locale: locale === 'en' ? 'en_US' : 'ru_RU',
      type: 'website',
      siteName: 'WebMarks',
    },
  }
}

export default async function RootLayout({
  children,
}: LayoutProps<'/[locale]'>) {
  const session = await verifySession()

  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={cn('h-full', 'antialiased', fontExcalidraw.variable)}
      data-scroll-behavior='smooth'
      suppressHydrationWarning // suppressing dark theme class application
      data-testid={TEST_IDS.STATIC.HTML}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body className='flex min-h-full flex-col'>
        <Providers
          initialDialogOpen={!session}
          initialDialogContent={!session ? <Auth initialMode='signin' /> : null}
        >
          <header className='border-b'>
            <div className='flex h-(--header-height) items-center justify-between px-[30px] md:px-[40px]'>
              <Link href='/'>
                <h1 className='text-[30px] font-bold'>WebMarks</h1>
              </Link>
              <div className='flex items-center gap-[20px]'>
                <Suspense
                  fallback={
                    <Skeleton
                      className='size-9 rounded-4xl'
                      data-testid={TEST_IDS.STATIC.SKELETON_FALLBACK}
                    />
                  }
                >
                  <ThemeToggleButton />
                </Suspense>
                <Suspense
                  fallback={
                    <ProfileSkeleton
                      data-testid={TEST_IDS.STATIC.SKELETON_FALLBACK}
                    />
                  }
                >
                  <Profile />
                </Suspense>
              </div>
            </div>
          </header>

          <main className='flex h-(--content-height)'>
            <nav className='h-full'>
              <AppSidebar />
            </nav>
            <ScrollArea className='scroll-container h-full w-full'>
              {children}
            </ScrollArea>
          </main>
        </Providers>
      </body>
    </html>
  )
}
