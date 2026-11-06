'use client'

import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { TEST_IDS } from '@/shared/config/testids'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { Checkbox } from '@/shared/ui/checkbox'
import { Field, FieldLabel } from '@/shared/ui/field'

type MarkTagItemProps = Pick<Tag, 'id' | 'title'> & {
  defaultChecked?: boolean
}

export const MarkTagItem = memo(function Memoized({
  id,
  title,
  defaultChecked = false,
}: MarkTagItemProps) {
  const [checked, setChecked] = useState(defaultChecked)

  const t = useTranslations('MarkTagItem')

  return (
    <FieldLabel>
      <Field
        orientation='horizontal'
        aria-label={t('ariaLabel')}
        onClick={() => setChecked(!checked)}
      >
        <Checkbox
          name={`tagId-${id}`}
          value={id}
          checked={checked}
          data-testid={TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(id)}
        />
        <FieldLabel>{title}</FieldLabel>
      </Field>
    </FieldLabel>
  )
})
