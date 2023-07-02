import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { Dropdown } from '@/shared/ui/deprecated/Popups'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import {
  getIsUserAdmin,
  getIsUserManager,
  getUserAuthData,
  useUserActions,
} from '@/entities/User'
import { routes } from '@/shared/lib/router/routes'

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

    return (
      <Dropdown
        className={className}
        items={[
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
        ]}
        triggerChildren={
          <Avatar
            size='2rem'
            src={authData.avatar}
            fallbackColor='invertedPrimary'
          />
        }
      />
    )
  }
)

UserDropdown.displayName = 'UserDropdown'
