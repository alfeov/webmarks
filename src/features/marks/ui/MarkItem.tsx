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

const tags = [
  {
    id: 1,
    title: 'Programming',
  },
  {
    id: 2,
    title: 'Work',
  },
  {
    id: 3,
    title: 'Shopping',
  },
  {
    id: 4,
    title: 'Home',
  },
  {
    id: 5,
    title: 'CSS',
  },
]

export function MarkItem({
  title,
  description,
  pinned,
  logoUrl,
  url,
  // tags,
}: WebMarkWithTags) {
  return (
    <Card className='max-h-min'>
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
      <CardContent>{description}</CardContent>
      <CardFooter className='justify-between gap-[20px]'>
        <div className='flex flex-wrap gap-[10px]'>
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.title}</Badge>
          ))}
        </div>
        {pinned && <Pin className='rotate-45 w-[20px] mr-[8px]' />}
      </CardFooter>
    </Card>
  )
}
