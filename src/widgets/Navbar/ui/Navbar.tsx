import { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { HStack } from 'shared/ui/Stack'
import { RoutePath } from 'shared/config/routeConfig/routePath'
import { NotificationPopup } from 'features/NotificationPopup'
import { UserDropdown } from 'features/UserDropdown'
import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpened, setIsAuthModalOpened] =
    useState(false)
  const authData = useSelector(getUserAuthData)

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

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
          <HStack gap={1} className={styles.actions}>
            <NotificationPopup />
            <UserDropdown />
          </HStack>
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
