import { Marks } from '@/widgets/marks/ui/Marks'

export async function MarksByTagPage({ params }: PageProps<'/[tag]'>) {
  const { tag } = await params

  return <Marks tagTitle={tag} />
}
