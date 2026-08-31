import { MarkItemSkeleton } from '@/entities/mark/ui/MarkItemSkeleton'

import { MarkGrid } from './MarkGrid'

export function MarksListSkeleton() {
  return (
    <MarkGrid>
      {Array.from({ length: 10 }).map((_, i) => (
        <MarkItemSkeleton key={i} />
      ))}
    </MarkGrid>
  )
}
