export function MarkGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[30px] content-start not-empty:pb-[30px]'>
      {children}
    </div>
  )
}
