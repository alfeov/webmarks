import { Skeleton } from './skeleton'

interface AvatarSkeletonProps {
  size?: 'default' | 'sm' | 'lg'
}

export function AvatarSkeleton({ size = 'default' }: AvatarSkeletonProps) {
  return (
    <Skeleton
      data-size={size}
      className='rounded-[50%] size-8 data-[size=lg]:size-10 data-[size=sm]:size-6'
    />
  )
}
