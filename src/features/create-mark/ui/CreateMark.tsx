'use client'

import { FieldDescription, FieldGroup, FieldLegend } from '@/shared/ui/field'

import { MetaProvider } from '../model/MetaContext'
import { CreateMarkForm } from './CreateMarkForm'
import { LoadMetaForm } from './LoadMetaForm'

export function CreateMark() {
  return (
    <FieldGroup>
      <FieldLegend>Create new WebMark</FieldLegend>
      <FieldDescription>
        Please fill in the fields below to create new WebMark
      </FieldDescription>
      <MetaProvider>
        <LoadMetaForm />
        <CreateMarkForm />
      </MetaProvider>
    </FieldGroup>
  )
}
