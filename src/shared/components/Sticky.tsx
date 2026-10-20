'use client'

import { Suspense, use } from 'react'
import { browser, createPortal } from 'react-dom'

import { cn } from '../lib/utils'

interface PortalWrapper {
  children: React.ReactNode
}

function PortalToBody({ children }: { children: React.ReactNode }) {
  use(browser())

  return createPortal(children, document.body)
}

export function PortalWrapper({ children }: PortalWrapper) {
  return (
    <Suspense>
      <PortalToBody>{children}</PortalToBody>
    </Suspense>
  )
}

type AbsoluteWrapperProps = React.ComponentProps<'div'>
export function AbsoluteWrapper({
  className,
  children,
  ...props
}: AbsoluteWrapperProps) {
  return (
    <div className={cn('absolute top-0 h-full', className)} {...props}>
      {children}
    </div>
  )
}

type StickyWrapperProps = React.ComponentProps<'div'>
export function StickyWrapper({
  className,
  children,
  ...props
}: StickyWrapperProps) {
  return (
    <div className={cn('sticky top-0', className)} {...props}>
      {children}
    </div>
  )
}
