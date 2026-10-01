import { Metadata } from 'next'

import { Marks } from '@/widgets/marks/ui/Marks'

export const metadata: Metadata = {
  title: 'WebMarks by Tag',
}

export async function MarksByTagPage({
  params,
  searchParams,
}: PageProps<'/[locale]/[tagId]'>) {
  return <Marks params={params} searchParams={searchParams} />
}
