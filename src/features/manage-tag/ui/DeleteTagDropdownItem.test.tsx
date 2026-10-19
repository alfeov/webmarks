import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { DeleteTagDropdownItem } from './DeleteTagDropdownItem'

const { DeleteTagForm } = vi.hoisted(() => ({
  DeleteTagForm: vi.fn(),
}))

vi.mock('./DeleteTagForm', () => ({
  DeleteTagForm,
}))

const tagId = '1'

describe('DeleteTagDropdownItem', () => {
  it('should open DeleteTagForm on click and pass corresponding arguments to it', async () => {
    renderWithProviders(
      <DropdownMenu>
        <DeleteTagDropdownItem tagId={tagId} />
      </DropdownMenu>,
    )

    await userEvent.click(screen.getByText('items.delete'))

    expect(DeleteTagForm).toHaveBeenCalledWith(
      {
        tagId,
      },
      undefined,
    )
  })
})
