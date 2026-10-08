import { toast } from '@/shared/ui/toast'

import { showToast } from './showToast'

const title = 'Toast title'
const description = 'Toast message'

vi.mock('@/shared/ui/toast', () => ({
  toast: {
    add: vi.fn(),
  },
}))

describe('showToast', () => {
  it('should calls toast with error type by default', () => {
    showToast(title, description)

    expect(toast.add).toHaveBeenCalledWith({
      type: 'error',
      title,
      description,
      priority: 'high',
    })
  })
  it('should calls toast with success type when it is specified in args', () => {
    showToast(title, description, true)

    expect(toast.add).toHaveBeenCalledWith({
      type: 'success',
      title,
      description,
    })
  })
})
