export const spyOnConsoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(vi.fn())
