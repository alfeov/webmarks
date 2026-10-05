import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { SwitchLocale } from '@/features/switch-locale/SwitchLocale'
import { ThemeToggleButton } from '@/features/toggle-theme/ui/ThemeToggleButton'
import { Link } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { cn } from '@/shared/lib/utils'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { SpinnerEmpty } from '@/shared/ui/SpinnerEmpty'
import { Profile } from '@/widgets/profile/ui/Profile'
import { ProfileSkeleton } from '@/widgets/profile/ui/ProfileSkeleton'
import { AppSidebar } from '@/widgets/sidebar/ui/AppSidebar'

import { Providers } from './_providers/Providers'

import '../styles/index.css'

const fontExcalidraw = localFont({
  src: '../Excalifont-Regular.woff2',
  display: 'swap',
  variable: '--font-excalifont',
})

const BASE_URL = new URL(
  String(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000',
)

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
  const locale = await getLocale()
  const t = await getTranslations('Layout')

  return (
    <html
      lang={locale}
      className={cn('h-full', 'antialiased', fontExcalidraw.variable)}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
							(function () {
								try {
									const storedTheme = JSON.parse(localStorage.getItem('webmarks/theme')) ?? 'system'
									const isPreferredDarkTheme = window.matchMedia(
										'(prefers-color-scheme: dark)',
									).matches

									const isCurrentThemeDark =
										storedTheme === 'system' ? isPreferredDarkTheme : storedTheme === 'dark'

									const root = window.document.documentElement
									root.classList.toggle('dark', isCurrentThemeDark)
								} catch (e) {}
							})()
						`,
          }}
        />
      </head>
      <body className='flex min-h-full flex-col'>
        <Suspense
          fallback={
            <SpinnerEmpty
              title={t('loaderTitle')}
              description={t('loaderDescription')}
            />
          }
        >
          <Providers>
            <header className='border-b'>
              <div className='flex h-(--header-height) items-center justify-between px-[30px] md:px-[40px]'>
                <Link href='/'>
                  <h1 className='text-[30px] font-bold'>WebMarks</h1>
                </Link>
                <div className='flex items-center gap-[20px]'>
                  <SwitchLocale />
                  <ThemeToggleButton />
                  <Suspense fallback={<ProfileSkeleton />}>
                    <Profile />
                  </Suspense>
                </div>
              </div>
            </header>

            <main className='flex h-(--content-height)'>
              <nav className='h-full'>
                <AppSidebar />
              </nav>
              <ScrollArea className='h-full w-full'>{children}</ScrollArea>
            </main>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
