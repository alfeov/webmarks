import { NextIntlClientProvider } from 'next-intl'

import {
  DialogProvider,
  type DialogProviderProps,
} from '@/shared/lib/contexts/DialogContext'
import { FetchingIndicatorProvider } from '@/shared/lib/contexts/FetchingIndicatorContext'
import { Toaster } from '@/shared/ui/toast'
import { TooltipProvider } from '@/shared/ui/tooltip'

export type ProvidersProps = DialogProviderProps

export function Providers({
  children,
  initialDialogContent,
  initialDialogOpen,
}: ProvidersProps) {
  return (
    <NextIntlClientProvider>
      <TooltipProvider>
        <FetchingIndicatorProvider>
          <DialogProvider
            initialDialogOpen={initialDialogOpen}
            initialDialogContent={initialDialogContent}
          >
            {children}
            <Toaster />
          </DialogProvider>
        </FetchingIndicatorProvider>
      </TooltipProvider>
    </NextIntlClientProvider>
  )
}
