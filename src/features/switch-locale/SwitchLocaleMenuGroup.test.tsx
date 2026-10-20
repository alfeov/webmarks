import { render, screen } from '@testing-library/react'

import { routing } from '@/shared/i18n/routing'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'

import { SwitchLocaleMenuGroup } from './SwitchLocaleMenuGroup'

const { usePathname, useRouter } = vi.hoisted(() => ({
  usePathname: () => '',
  useRouter: () => ({
    replace: vi.fn(),
  }),
}))

vi.mock('@/shared/i18n/navigation', () => ({
  usePathname,
  useRouter,
}))

describe('SwitchLocaleSubMenu', () => {
  it('should render items for each language', () => {
    render(
      <DropdownMenu>
        <SwitchLocaleMenuGroup />
      </DropdownMenu>,
    )

    expect(screen.getAllByTestId('locale-item')).toHaveLength(
      routing.locales.length,
    )
  })
})
