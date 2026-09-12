import { getUserData } from '@/entities/user/api/getUserData'
import { verifySession } from '@/shared/lib/session'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { EditAvatarDropdownItem } from './EditAvatarDropdownItem'
import { LoginDropdownItem } from './SigninDropdownItem'
import { SignoutDropdownItem } from './SignoutDropdownItem'
import { SignupDropdownItem } from './SignupDropdownItem'

import { FaceSlightlyFrowning, FaceSlightlySmiling } from 'lucide-react'

export async function Profile() {
  const session = await verifySession()
  const { user } = await getUserData({ id: session?.userId })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon' className='rounded-[50%]'>
            <Avatar size='lg'>
              <AvatarImage
                src={user?.avatarUrl || 'errorSrc'} // to handle AvatarFallback
                alt={user?.username || 'system user avatar'}
              />
              <AvatarFallback>
                {session ? <FaceSlightlySmiling /> : <FaceSlightlyFrowning />}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent>
        {session && user ? (
          <>
            <DropdownMenuGroup>
              <EditAvatarDropdownItem avatarUrl={user?.avatarUrl} />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SignoutDropdownItem />
            </DropdownMenuGroup>
          </>
        ) : (
          <DropdownMenuGroup>
            <SignupDropdownItem />
            <LoginDropdownItem />
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
