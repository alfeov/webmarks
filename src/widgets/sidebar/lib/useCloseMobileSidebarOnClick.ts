import { useSidebar } from '@/shared/ui/sidebar'

export function useCloseMobileSidebarOnClick() {
  const { openMobile, setOpenMobile } = useSidebar()

  const handleClick = () => {
    if (openMobile) setOpenMobile(false)
  }

  return handleClick
}
