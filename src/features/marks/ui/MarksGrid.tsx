export function MarksGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[30px] content-start'>
      {children}
    </div>
  )
}
