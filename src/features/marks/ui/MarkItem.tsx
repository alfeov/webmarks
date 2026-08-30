import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { WebMarkWithTags } from '../model/types'

import { LucideEllipsis, Pin } from 'lucide-react'

export function MarkItem({
  title,
  description,
  pinned,
  logoUrl,
  url,
  tags,
}: WebMarkWithTags) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-[10px] overflow-hidden'>
          <Avatar size='lg'>
            <AvatarImage src={logoUrl ?? 'errorSrc'} />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div className='grow overflow-hidden'>
            <CardTitle className='truncate'>{title}</CardTitle>
            <CardDescription className='truncate'>
              {url.split('://')[1] || 'Incorrect Link'}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size='icon-sm'
                  variant='ghost'
                  data-slot='dropdown-menu-trigger'
                  aria-label='mark menu'
                >
                  <LucideEllipsis />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>{pinned ? 'Unpin' : 'Pin'}</DropdownMenuItem>
                <DropdownMenuItem>Tags</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                <DropdownMenuItem>Change</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='grow'>{description}</CardContent>
      <CardFooter className='justify-between gap-[20px] empty:hidden'>
        {Boolean(tags.length) && (
          <div className='flex flex-wrap gap-[10px]'>
            {tags.map((tag) => (
              <Badge key={tag.id}>{tag.title}</Badge>
            ))}
          </div>
        )}
        {pinned && <Pin className='rotate-45 w-[20px] mr-[8px]' />}
      </CardFooter>
    </Card>
  )
}
