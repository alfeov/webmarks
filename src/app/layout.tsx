import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import { Suspense } from 'react'

import { cn } from '@/shared/lib/utils'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { SpinnerEmpty } from '@/shared/ui/SpinerEmpty'
import { Profile } from '@/widgets/profile/ui/Profile'
import { ProfileSkeleton } from '@/widgets/profile/ui/ProfileSkeleton'
import { AppSidebar } from '@/widgets/sidebar/ui/AppSidebar'

import { Providers } from './_providers/Providers'

import './styles/index.css'

const fontExcalidraw = localFont({
  src: '../shared/assets/fonts/Excalifont-Regular.woff2',
  display: 'swap',
  variable: '--font-excalifont',
})

export const metadata: Metadata = {
  title: {
    template: '%s | WebMarks',
    default: 'WebMarks',
  },
  description:
    'Create and manege your web bookmarks on different devices with safe and instant experience',
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
    canonical: '/',
  },
  openGraph: {
    title: 'WebMarks',
    description:
      'Create and manege your web bookmarks on different devices with safe and instant experience',
    locale: 'en_US',
    type: 'website',
    siteName: 'WebMarks',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={cn('h-full', 'antialiased', fontExcalidraw.variable)}
      data-scroll-behavior='smooth'
    >
      <head>
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link
          rel='icon'
          href='/icon-192.png'
          type='image/png'
          sizes='192x192'
        />
        <link
          rel='icon'
          href='/icon-512.png'
          type='image/png'
          sizes='512x512'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>
      <body className='flex min-h-full flex-col'>
        <Suspense fallback={<SpinnerEmpty>App Initialization</SpinnerEmpty>}>
          <Providers>
            <header className='border-b'>
              <div className='flex h-(--header-height) items-center justify-between px-[30px] md:px-[40px]'>
                <Link href='/'>
                  <h1 className='text-[30px] font-bold'>WebMarks</h1>
                </Link>
                <Suspense fallback={<ProfileSkeleton />}>
                  <Profile />
                </Suspense>
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
