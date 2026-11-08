import { screen } from '@testing-library/react'

export function expectInputsToBeEnabled(inputNames: string[]) {
  for (const inputName of inputNames) {
    expect(screen.getByTestId(`${inputName}-input`)).toBeEnabled()
  }
}
