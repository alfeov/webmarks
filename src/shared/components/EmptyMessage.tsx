import { cn } from '../lib/utils'

export function EmptyMessage({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground text-center', className)}
      {...props}
    />
  )
}
