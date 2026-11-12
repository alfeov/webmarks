'use client'

import { useTranslations } from 'next-intl'

import { MetaProvider } from '@/features/create-mark/model/MetaContext'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { CreateMarkForm } from './CreateMarkForm'
import { LoadMetaForm } from './LoadMetaForm'

export function CreateMark() {
  const t = useTranslations('CreateMark')

  return (
    <FieldSet>
      <FieldLegend>{t('formTitle')}</FieldLegend>
      <FieldDescription>{t('formDescription')}</FieldDescription>
      <MetaProvider>
        <LoadMetaForm />
        <CreateMarkForm />
      </MetaProvider>
    </FieldSet>
  )
}
