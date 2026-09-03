import { useState } from 'react'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { Checkbox } from '@/shared/ui/checkbox'
import { Field, FieldLabel } from '@/shared/ui/field'

type MarkTagItemProps = Pick<Tag, 'id' | 'title'> & {
  defaultChecked?: boolean
}

export function MarkTagItem({ defaultChecked, id, title }: MarkTagItemProps) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <FieldLabel>
      <Field
        orientation='horizontal'
        aria-label='Toggle tag'
        onClick={() => setChecked(!checked)}
      >
        <Checkbox name={`tagId-${id}`} value={id} checked={checked} />
        <FieldLabel>{title}</FieldLabel>
      </Field>
    </FieldLabel>
  )
}
