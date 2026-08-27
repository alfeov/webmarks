import { AuthDialogProvider } from '@/features/auth/model/AuthDialogContext'
import { Toaster } from '@/shared/ui/toast'
import { TooltipProvider } from '@/shared/ui/tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AuthDialogProvider>
        {children}
        <Toaster />
      </AuthDialogProvider>
    </TooltipProvider>
  )
}
