import { useSidebar } from '@/shared/ui/sidebar'

export function useCloseMobileSidebarOnClick() {
  const { openMobile, setOpenMobile } = useSidebar()

  const closeMobileSidebar = () => {
    if (openMobile) setOpenMobile(false)
  }

  return closeMobileSidebar
}
