import { Tag } from '@/shared/lib/prisma/generated/client'
import { Checkbox } from '@/shared/ui/checkbox'
import { Field, FieldLabel } from '@/shared/ui/field'

type MarkTagItemProps = {
  tagId: Tag['id']
  title: Tag['title']
  defaultChecked?: boolean
}

export function MarkTagItem({
  defaultChecked,
  title,
  tagId,
}: MarkTagItemProps) {
  return (
    <FieldLabel>
      <Field orientation='horizontal' aria-label='Toggle tag'>
        <Checkbox name={tagId} defaultChecked={defaultChecked} />
        <FieldLabel>{title}</FieldLabel>
      </Field>
    </FieldLabel>
  )
}
