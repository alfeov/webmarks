import { Marks } from '@/widgets/marks/ui/Marks'

export function AllMarksPage({ searchParams }: PageProps<'/'>) {
  return <Marks searchParams={searchParams} />
}
