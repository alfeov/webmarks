export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-sm font-normal text-destructive empty:hidden'>
      {children}
    </p>
  )
}
