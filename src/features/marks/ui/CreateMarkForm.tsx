'use client'

import { use } from 'react'
import { useForm } from 'react-hook-form'

import { Field, FieldLabel, FieldLegend, FieldSet } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { MetaContext } from '../model/MetaContext'
export function CreateMarkForm() {
  const metaContext = use(MetaContext)

  console.log(metaContext?.meta)
  const { register, handleSubmit } = useForm({
    values: metaContext?.meta,
  })

  return (
    <form>
      <FieldSet>
        <FieldSet>
          <FieldLegend>Required Fields</FieldLegend>
          <Field>
            <FieldLabel className='req'>Title</FieldLabel>
            <Input placeholder='WebMark' {...register('title')} />
            {/* <FieldError></FieldError> */}
          </Field>
          <Field>
            <FieldLabel className='req'>URL</FieldLabel>
            <Input placeholder='https://webmarks.com' {...register('url')} />
            {/* <FieldError></FieldError> */}
          </Field>
          <Field>
            <FieldLabel className='req'>Description</FieldLabel>
            <Input
              placeholder='Some cool description to your link'
              {...register('description')}
            />
            {/* <FieldError></FieldError> */}
          </Field>
        </FieldSet>
        <FieldSet>
          <FieldLegend>Images Fields (Optional)</FieldLegend>
          <Field>
            <FieldLabel>Logo URL (Preferred over Image URL)</FieldLabel>
            <Input placeholder='https://logo.com' {...register('logo.url')} />
            {/* <FieldError></FieldError> */}
          </Field>
          <Field>
            <FieldLabel>Image URL</FieldLabel>
            <Input placeholder='https://image.com' {...register('image.url')} />
            {/* <FieldError></FieldError> */}
          </Field>
        </FieldSet>
      </FieldSet>
    </form>
  )
}
