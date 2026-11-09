import { TEST_IDS } from '@/shared/config/testids'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/shared/ui/card'

import type { WebMarkWithTags } from '../model/types'

import PinIcon from '@/shared/assets/icons/pin.svg'

export type MarkItemProps = WebMarkWithTags & {
  children: React.ReactNode
}

export function MarkItem({
  id,
  title,
  description,
  pinned,
  logoUrl,
  url,
  tags,
  children,
}: MarkItemProps) {
  return (
    <Card data-testid={TEST_IDS.STATIC.MARK_ITEM(id)} role='listitem'>
      <div className='flex items-center gap-[10px] px-(--card-spacing)'>
        <a href={url} target='_blank' className='rounded-[50%]'>
          <Avatar size='lg'>
            <AvatarImage src={logoUrl || 'errorSrc'} alt={title} />
            <AvatarFallback>{title.charAt(0)}</AvatarFallback>
          </Avatar>
        </a>
        <div className='grow overflow-hidden'>
          <CardTitle
            className='truncate'
            data-testid={TEST_IDS.STATIC.MARK_ITEM_TITLE}
          >
            {title}
          </CardTitle>
          <CardDescription
            className='truncate'
            data-testid={TEST_IDS.STATIC.MARK_ITEM_URL}
          >
            {url.split('://')[1]}
          </CardDescription>
        </div>
        {children}
      </div>
      <CardContent
        className='grow'
        data-testid={TEST_IDS.STATIC.MARK_ITEM_DESCRIPTION}
      >
        {description}
      </CardContent>
      <CardFooter className='justify-between gap-[20px] empty:hidden'>
        {Boolean(tags.length) ? (
          <div className='flex flex-wrap gap-[10px]'>
            {tags.map((tag) => (
              <Badge
                key={`${tag.id}-${tag.updatedAt}`}
                data-testid={TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE(tag.id)}
              >
                {tag.title}
              </Badge>
            ))}
          </div>
        ) : (
          <span data-testid='span'></span>
        )}
        {pinned && (
          <PinIcon
            className='mr-[7px] size-[20px]'
            data-testid={TEST_IDS.STATIC.PIN_ICON}
          />
        )}
      </CardFooter>
    </Card>
  )
}
