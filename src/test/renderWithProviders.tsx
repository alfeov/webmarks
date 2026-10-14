import { render, renderHook } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import {
  TagsProvider,
  type TagsProviderProps,
} from '@/entities/tag/model/TagsContext'
import { MetaProvider } from '@/features/create-mark/model/MetaContext'
import messages from '@/shared/i18n/messages/en.json'
import {
  DialogProvider,
  type DialogProviderProps,
} from '@/shared/lib/contexts/DialogContext'
import { FetchingIndicatorProvider } from '@/shared/lib/contexts/FetchingIndicatorContext'
import { Toaster } from '@/shared/ui/toast'
import { TooltipProvider } from '@/shared/ui/tooltip'

type AllProviders = {
  children: React.ReactNode
} & DialogProviderProps &
  TagsProviderProps

export function AllProviders({
  children,
  tags,
  initialDialogOpen,
  initialDialogContent,
}: AllProviders) {
  return (
    <NextIntlClientProvider locale='en' messages={messages}>
      <TooltipProvider>
        <FetchingIndicatorProvider>
          <MetaProvider>
            <TagsProvider tags={tags}>
              <DialogProvider
                initialDialogOpen={initialDialogOpen}
                initialDialogContent={initialDialogContent}
              >
                {children}
                <Toaster />
              </DialogProvider>
            </TagsProvider>
          </MetaProvider>
        </FetchingIndicatorProvider>
      </TooltipProvider>
    </NextIntlClientProvider>
  )
}

export function renderWithProviders(
  component: React.ReactNode = null,
  {
    tags = [],
    initialDialogContent = null,
    initialDialogOpen = false,
  }: Omit<AllProviders, 'children'> = {},
) {
  return render(
    <AllProviders
      tags={tags}
      initialDialogContent={initialDialogContent}
      initialDialogOpen={initialDialogOpen}
    >
      {component}
    </AllProviders>,
  )
}

export const renderHookWithProviders = <Result, Props extends unknown[]>(
  hook: (...initialProps: Props) => Result,
  initialProps?: Props,
) => {
  return renderHook((args: Props) => hook(...args), {
    wrapper: AllProviders,
    initialProps,
  })
}
