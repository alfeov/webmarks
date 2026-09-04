'use client'

import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { MetaProvider } from '../model/MetaContext'
import { CreateMarkForm } from './CreateMarkForm'
import { LoadMetaForm } from './LoadMetaForm'

export function CreateMark() {
  return (
    <FieldSet>
      <FieldLegend>Create new WebMark</FieldLegend>
      <FieldDescription>
        Please fill in the fields below to create new WebMark
      </FieldDescription>
      <MetaProvider>
        <LoadMetaForm />
        <CreateMarkForm />
      </MetaProvider>
    </FieldSet>
  )
}
