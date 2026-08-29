import { MarksList } from '@/widgets/marks-list/ui/MarksList'

export async function MarksByTagPage({ params }: PageProps<'/[tag]'>) {
  const { tag } = await params

  return <MarksList tagTitle={tag} />
}
