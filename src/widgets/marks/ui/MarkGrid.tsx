import { cn } from '@/shared/lib/utils'

export function MarkGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role='list'
      className={cn(
        'grid content-start gap-[30px] not-empty:pb-[30px] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
        className,
      )}
      {...props}
    />
  )
}
