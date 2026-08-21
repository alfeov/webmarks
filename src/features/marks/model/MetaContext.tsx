'use client'

import mql, { MicrolinkError, MqlResponseData } from '@microlink/mql'
import { createContext, useState } from 'react'

export const MetaContext = createContext<null | ContextValue>(null)

const initialState: MqlResponseData = {
  title: '',
  url: '',
  description: '',
  logo: {
    url: '',
  },
  image: {
    url: '',
  },
}

export interface ContextValue {
  meta: typeof initialState
  loadMeta: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<{ error: string }>
}

export function MetaProvider({ children }: { children: React.ReactNode }) {
  const [meta, setMeta] = useState(initialState)

  async function loadMeta(prevState: unknown, formData: FormData) {
    const { url } = Object.fromEntries(formData)

    const webmarkUrl = url.toString().trim()

    if (webmarkUrl) {
      try {
        const { data } = await mql(webmarkUrl.toString(), {
          meta: true,
        })
        setMeta(data)
        return { error: '' }
      } catch (error) {
        if (error instanceof MicrolinkError) {
          return {
            error: error.data?.url ?? 'Unknown error',
          }
        }
      }
    }

    return { error: 'Do not provide empty URL' }
  }

  return <MetaContext value={{ meta, loadMeta }}>{children}</MetaContext>
}
