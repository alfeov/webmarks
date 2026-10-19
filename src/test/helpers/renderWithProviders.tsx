import { render } from '@testing-library/react'

import {
  Providers,
  type ProvidersProps,
} from '@/app/[locale]/_providers/Providers'

export function renderWithProviders(
  component: React.ReactNode = null,
  {
    initialDialogContent,
    initialDialogOpen,
  }: Omit<ProvidersProps, 'children'> = {},
) {
  return render(
    <Providers
      initialDialogContent={initialDialogContent}
      initialDialogOpen={initialDialogOpen}
    >
      {component}
    </Providers>,
  )
}
