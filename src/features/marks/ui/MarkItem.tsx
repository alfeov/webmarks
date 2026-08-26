import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
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

import { LucideEllipsis } from 'lucide-react'

interface MarkItemProps extends Mark {
  children?: React.ReactNode
}

export function MarkItem({
  title,
  description,
  image,
  logo,
  url,
}: MarkItemProps) {
  return (
    <Card className='max-h-min'>
      <CardHeader>
        <div className='flex items-center gap-[10px] overflow-hidden'>
          <Avatar size='lg'>
            <AvatarImage src={image.url ?? logo.url} />
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
                <DropdownMenuItem>Pin</DropdownMenuItem>
                <DropdownMenuItem>Tags</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                <DropdownMenuItem>Change</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
