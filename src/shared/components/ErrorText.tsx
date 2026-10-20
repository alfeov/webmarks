export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-destructive text-sm font-normal empty:hidden'>
      {children}
    </p>
  )
}
