import { Marks } from '@/widgets/marks/ui/Marks'

export function AllMarksPage({ searchParams }: PageProps<'/[locale]'>) {
  return <Marks searchParams={searchParams} />
}
