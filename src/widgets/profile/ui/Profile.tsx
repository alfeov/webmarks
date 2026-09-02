import { verifySession } from '@/shared/lib/session'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { LoginMenuItem } from './SigninMenuItem'
import { SignoutMenuItem } from './SignoutMenuItem'
import { SignupMenuItem } from './SignupMenuItem'

import { FaceSlightlyFrowning, FaceSlightlySmiling } from 'lucide-react'

export async function Profile() {
  const session = await verifySession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon' className='rounded-full'>
            <Avatar size='lg'>
              <AvatarImage
                src={session?.avatarUrl || 'errorSrc'} // to handle AvatarFallback
                alt={session?.username || 'empty avatar'}
              />
              <AvatarFallback>
                {session ? <FaceSlightlySmiling /> : <FaceSlightlyFrowning />}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent>
        {session ? (
          <DropdownMenuGroup>
            <SignoutMenuItem />
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <SignupMenuItem />
            <LoginMenuItem />
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
