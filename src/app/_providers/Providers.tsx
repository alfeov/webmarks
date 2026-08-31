import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { TagsProvider } from '@/entities/tag/model/TagsContext'
import { AuthDialogProvider } from '@/features/auth/model/AuthDialogContext'
import { MarkTagsDialogProvider } from '@/features/manage-mark-tags/model/MarkTagsDialogContext'
import { verifySession } from '@/shared/lib/session'
import { Toaster } from '@/shared/ui/toast'
import { TooltipProvider } from '@/shared/ui/tooltip'

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await verifySession()
  const { tags } = await getAllUserTags({ userId: session?.userId })

  return (
    <TooltipProvider>
      <TagsProvider initialTags={tags}>
        <AuthDialogProvider>
          <MarkTagsDialogProvider>{children}</MarkTagsDialogProvider>
          <Toaster />
        </AuthDialogProvider>
      </TagsProvider>
    </TooltipProvider>
  )
}
