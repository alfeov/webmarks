import { screen } from '@testing-library/react'

export function expectInputsToBeDisabled(inputNames: string[]) {
  for (const inputName of inputNames) {
    expect(screen.getByTestId(`${inputName}-input`)).toBeDisabled()
  }
}
