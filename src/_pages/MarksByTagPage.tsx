import { Marks } from '@/widgets/marks/ui/Marks'

export async function MarksByTagPage({
  params,
  searchParams,
}: PageProps<'/[tagId]'>) {
  return <Marks params={params} searchParams={searchParams} />
}
