import { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import {
  getIsUserAdmin,
  getIsUserManager,
  getUserAuthData,
  userActions,
} from 'entities/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { HStack } from 'shared/ui/Stack'
import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpened, setIsAuthModalOpened] =
    useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useAppDispatch()

  const isAdmin = useSelector(getIsUserAdmin)
  const isManager = useSelector(getIsUserManager)
  const isAdminPanelAvailable = isAdmin || isManager

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  return (
    <HStack
      as='header'
      gap={1}
      className={classNames(styles.navbar, {}, [className])}
      maxWidth
    >
      <Text
        className={styles.appName}
        theme={TextTheme.INVERTED}
        title={t('Netliukh Demian')}
      />
      {authData ? (
        <>
          <AppLink
            to={RoutePath.article_create}
            className={styles.createLink}
            theme={AppLinkTheme.INVERTED}
          >
            {t('Create article')}
          </AppLink>
          <Dropdown
            className={styles.loginBtn}
            items={[
              ...(isAdminPanelAvailable
                ? [
                    {
                      label: t('Admin panel'),
                      href: RoutePath.admin_panel,
                    },
                  ]
                : []),
              {
                label: t('Profile'),
                href: RoutePath.profile + authData.id,
              },
              {
                label: t('Logout'),
                onClick: onLogout,
              },
            ]}
            triggerChildren={
              authData?.avatar ? (
                <Avatar size='2rem' src={authData.avatar} />
              ) : (
                t('Account')
              )
            }
          />
        </>
      ) : (
        <Button
          type='button'
          theme={ButtonTheme.CLEAR_INVERTED}
          onClick={onOpenModal}
          className={styles.loginBtn}
        >
          {t('Login')}
        </Button>
      )}
      {isAuthModalOpened && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </HStack>
  )
})

Navbar.displayName = 'Navbar'
