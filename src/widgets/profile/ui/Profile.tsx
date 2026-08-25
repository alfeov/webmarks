import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { LoginMenuItem } from './LoginMenuItem'
import { LogoutMenuItem } from './LogoutMenuItem'
import { SignupMenuItem } from './SignupMenuItem'

export function Profile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon' className='rounded-full'>
            <Avatar size='lg'>
              <AvatarImage src='https://github.com/shadcn.png' alt='shadcn' />
              <AvatarFallback>???</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <SignupMenuItem />
          <LoginMenuItem />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutMenuItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
