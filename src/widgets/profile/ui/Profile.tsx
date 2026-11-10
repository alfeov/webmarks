import { getTranslations } from 'next-intl/server'

import { getUserData } from '@/entities/user/api/getUserData'
import { SwitchLocaleMenuGroup } from '@/features/switch-locale/SwitchLocaleMenuGroup'
import { TEST_IDS } from '@/shared/config/testids'
import { verifySession } from '@/shared/lib/session'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { EditAvatarDropdownItem } from './EditAvatarDropdownItem'
import { SigninDropdownItem } from './SigninDropdownItem'
import { SignoutDropdownItem } from './SignoutDropdownItem'
import { SignupDropdownItem } from './SignupDropdownItem'

import { FaceSlightlyFrowning } from 'lucide-react'

export async function Profile() {
  const session = await verifySession()
  const user = session ? await getUserData({ id: session.userId }) : null

  const t = await getTranslations('Profile')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='rounded-[50%]'
            aria-label={t('ariaLabel')}
            data-testid={TEST_IDS.CLICKABLE.BUTTON.PROFILE}
          >
            <Avatar size='lg'>
              <AvatarImage
                src={user?.avatarUrl || undefined} // to handle AvatarFallback if url is ''
                alt={user?.username || 'system user avatar'}
                data-testid={TEST_IDS.STATIC.PROFILE_AVATAR}
              />
              <AvatarFallback
                data-testid={TEST_IDS.STATIC.PROFILE_AVATAR_FALLBACK}
              >
                {session && user ? (
                  user.username.charAt(0).toUpperCase()
                ) : (
                  <FaceSlightlyFrowning />
                )}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              data-testid={TEST_IDS.CLICKABLE.BUTTON.SWITCH_LOCALE}
            >
              {t('translate')}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <SwitchLocaleMenuGroup />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        {session && user ? (
          <>
            <DropdownMenuGroup>
              <EditAvatarDropdownItem avatarUrl={user.avatarUrl} />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SignoutDropdownItem />
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SignupDropdownItem />
              <SigninDropdownItem />
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
