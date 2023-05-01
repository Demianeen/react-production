import React, { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
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

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <header
        className={classNames(styles.navbar, {}, [
          className,
        ])}
      >
        <Text
          className={styles.appName}
          theme={TextTheme.INVERTED}
          title={t('Netliukh Demian')}
        />
        <AppLink
          to={RoutePath.article_create}
          className={styles.createLink}
          theme={AppLinkTheme.INVERTED}
        >
          {t('Create article')}
        </AppLink>
        <Button
          type='button'
          theme={ButtonTheme.CLEAR_INVERTED}
          className={styles.loginBtn}
          onClick={onLogout}
        >
          {t('Logout')}
        </Button>
      </header>
    )
  }

  return (
    <header
      className={classNames(styles.navbar, {}, [className])}
    >
      <Button
        type='button'
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onOpenModal}
        className={styles.links}
      >
        {t('Login')}
      </Button>
      {isAuthModalOpened && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </header>
  )
})

Navbar.displayName = 'Navbar'
