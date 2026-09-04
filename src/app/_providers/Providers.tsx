import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { TagsProvider } from '@/entities/tag/model/TagsContext'
import { DialogProvider } from '@/shared/lib/contexts/DialogContext'
import { FetchingIndicatorProvider } from '@/shared/lib/contexts/FetchingIndicatorContext'
import { verifySession } from '@/shared/lib/session'
import { Toaster } from '@/shared/ui/toast'
import { TooltipProvider } from '@/shared/ui/tooltip'

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await verifySession()
  const { tags } = await getAllUserTags({ userId: session?.userId })

  return (
    <TooltipProvider>
      <FetchingIndicatorProvider>
        <TagsProvider tags={tags}>
          <DialogProvider>
            {children}
            <Toaster />
          </DialogProvider>
        </TagsProvider>
      </FetchingIndicatorProvider>
    </TooltipProvider>
  )
}
