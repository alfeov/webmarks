import { AvatarSkeleton } from '@/shared/components/AvatarSkeleton'
import { TEST_IDS } from '@/shared/config/testids'

export function ProfileSkeleton() {
  return (
    <AvatarSkeleton size='lg' data-testid={TEST_IDS.STATIC.SKELETON_FALLBACK} />
  )
}
