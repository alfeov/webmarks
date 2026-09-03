import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'

import { WebMarkWithTags } from '../model/types'

import { Pin } from 'lucide-react'

type MarkItemProps = WebMarkWithTags & {
  children: React.ReactNode
}

export function MarkItem({
  title,
  description,
  pinned,
  logoUrl,
  url,
  tags,
  children,
}: MarkItemProps) {
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
          {children}
        </div>
      </CardHeader>
      <CardContent className='grow'>{description}</CardContent>
      <CardFooter className='justify-between gap-[20px] empty:hidden'>
        {Boolean(tags.length) && (
          <div className='flex flex-wrap gap-[10px]'>
            {tags.map((tag) => (
              <Badge key={`${tag.id}-${tag.updatedAt}`}>{tag.title}</Badge>
            ))}
          </div>
        )}
        {pinned && <Pin className='rotate-45 w-[20px] mr-[8px]' />}
      </CardFooter>
    </Card>
  )
}
