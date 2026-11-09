import { MarkItemSkeleton } from '@/entities/mark/ui/MarkItemSkeleton'
import { TEST_IDS } from '@/shared/config/testids'

import { MarkGrid } from './MarkGrid'

export function MarksListSkeleton() {
  return (
    <MarkGrid data-testid={TEST_IDS.STATIC.SKELETON_FALLBACK}>
      {Array.from({ length: 20 }).map((_, i) => (
        <MarkItemSkeleton key={i} />
      ))}
    </MarkGrid>
  )
}
