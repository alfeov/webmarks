import { screen } from '@testing-library/react'

export function expectFieldsToBeEnabled(fields: string[]) {
  for (const field of fields) {
    expect(screen.getByTestId(`${field}-input`)).toBeEnabled()
  }
}
