'use client'

import { use } from 'react'

import { AuthDialogSettersContext } from '@/features/auth/model/AuthDialogContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export function Profile() {
  const setters = use(AuthDialogSettersContext)

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
          <DropdownMenuItem onClick={setters?.openLoginDialog}>
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={setters?.openSignupDialog}>
            Signup
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant='destructive'>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
