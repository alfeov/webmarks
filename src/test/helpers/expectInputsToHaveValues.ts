import { screen } from '@testing-library/react'

export function expectInputsToHaveValues(fields: Record<string, string>) {
  for (const [name, value] of Object.entries(fields)) {
    expect(screen.getByTestId(`${name}-input`)).toHaveValue(value)
  }
}
