import { MarkItemSkeleton } from './MarkItemSkeleton'
import { MarksGrid } from './MarksGrid'

export function MarksListSkeleton() {
  return (
    <MarksGrid>
      {Array.from({ length: 10 }).map((_, i) => (
        <MarkItemSkeleton key={i} />
      ))}
    </MarksGrid>
  )
}
