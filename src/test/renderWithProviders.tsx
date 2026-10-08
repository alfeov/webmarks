import { render, renderHook } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import { TagsProvider } from '@/entities/tag/model/TagsContext'
import messages from '@/shared/i18n/messages/en.json'
import { DialogProvider } from '@/shared/lib/contexts/DialogContext'
import { FetchingIndicatorProvider } from '@/shared/lib/contexts/FetchingIndicatorContext'
import { Toaster } from '@/shared/ui/toast'
import { TooltipProvider } from '@/shared/ui/tooltip'

export function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale='en' messages={messages}>
      <TooltipProvider>
        <FetchingIndicatorProvider>
          {/* <TagsProvider tags={tags}> */}
          <DialogProvider initialOpen={false}>
            {children}
            <Toaster />
          </DialogProvider>
          {/* </TagsProvider> */}
        </FetchingIndicatorProvider>
      </TooltipProvider>
    </NextIntlClientProvider>
  )
}

export function renderWithProviders(component: React.ReactNode = null) {
  return render(<AllProviders>{component}</AllProviders>)
}

export const renderHookWithProviders = <Result, Props>(
  hook: (initialProps: Props) => Result,
) => {
  return renderHook(hook, {
    wrapper: AllProviders,
  })
}
