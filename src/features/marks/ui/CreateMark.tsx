import { Button } from '@/shared/ui/button'

import { Plus } from 'lucide-react'

export function CreateMark() {
  return (
    <Button>
      New WebMark
      <Plus data-icon='inline-end' />
    </Button>
  )
}
