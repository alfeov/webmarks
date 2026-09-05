import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/shared/ui/card'

import { WebMarkWithTags } from '../model/types'

import PinIcon from '@/shared/assets/icons/pin.svg'

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
      <div className='flex items-center gap-[10px] px-(--card-spacing)'>
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
      <CardContent className='grow'>{description}</CardContent>
      <CardFooter className='justify-between gap-[20px] empty:hidden'>
        {Boolean(tags.length) && (
          <div className='flex flex-wrap gap-[10px]'>
            {tags.map((tag) => (
              <Badge key={`${tag.id}-${tag.updatedAt}`}>{tag.title}</Badge>
            ))}
          </div>
        )}
        {pinned && (
          <Image src={PinIcon} alt='pin' className='mr-[7px] w-[20px]' />
        )}
      </CardFooter>
    </Card>
  )
}
