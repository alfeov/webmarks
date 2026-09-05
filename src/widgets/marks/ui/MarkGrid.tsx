export function MarkGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid content-start gap-[30px] not-empty:pb-[30px] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {children}
    </div>
  )
}
