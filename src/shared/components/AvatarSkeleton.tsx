import { Skeleton } from '@/shared/ui/skeleton'

import { cn } from '../lib/utils'

interface AvatarSkeletonProps extends React.ComponentProps<typeof Skeleton> {
  size?: 'default' | 'sm' | 'lg'
}

export function AvatarSkeleton({
  size = 'default',
  className,
  ...props
}: AvatarSkeletonProps) {
  return (
    <Skeleton
      data-size={size}
      className={cn(
        'size-8 rounded-[50%] data-[size=lg]:size-10 data-[size=sm]:size-6',
        className,
      )}
      {...props}
    />
  )
}
