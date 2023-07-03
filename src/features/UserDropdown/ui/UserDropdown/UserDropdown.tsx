import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import {
  getIsUserAdmin,
  getIsUserManager,
  getUserAuthData,
  useUserActions,
} from '@/entities/User'
import { routes } from '@/shared/lib/router/routes'
import { ToggleFeature } from '@/shared/lib/features'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Dropdown } from '@/shared/ui/redesigned/Popups'
import { Button } from '@/shared/ui/redesigned/Button'

interface UserDropdownProps {
  className?: string
}

export const UserDropdown = memo(
  ({ className }: UserDropdownProps) => {
    const { t } = useTranslation()

    const authData = useSelector(getUserAuthData)

    const isAdmin = useSelector(getIsUserAdmin)
    const isManager = useSelector(getIsUserManager)
    const isAdminPanelAvailable = isAdmin || isManager

    const { logout } = useUserActions()

    const onLogout = useCallback(() => {
      logout()
    }, [logout])

    if (!authData) {
      return null
    }

    const items = [
      ...(isAdminPanelAvailable
        ? [
            {
              label: t('Admin panel'),
              href: routes.adminPanel(),
            },
          ]
        : []),
      {
        label: t('Profile'),
        href: routes.profile({
          id: String(authData.id),
        }),
      },
      {
        label: t('Logout'),
        onClick: onLogout,
      },
    ]

    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Dropdown
            className={className}
            items={items}
            trigger={
              <Button type='button' variant='clear'>
                <Avatar size='3rem' src={authData.avatar} />
              </Button>
            }
          />
        }
        off={
          <DropdownDeprecated
            className={className}
            items={items}
            triggerChildren={
              <AvatarDeprecated
                size='2rem'
                src={authData.avatar}
                fallbackColor='invertedPrimary'
              />
            }
          />
        }
      />
    )
  }
)

UserDropdown.displayName = 'UserDropdown'
