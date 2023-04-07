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
      <div
        className={classNames(styles.navbar, {}, [
          className,
        ])}
      >
        <div className={styles.links} />
        <Button
          type='button'
          theme={ButtonTheme.CLEAR_INVERTED}
          onClick={onLogout}
        >
          {t('Logout')}
        </Button>
      </div>
    )
  }

  return (
    <div
      className={classNames(styles.navbar, {}, [className])}
    >
      <div className={styles.links} />
      <Button
        type='button'
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onOpenModal}
      >
        {t('Login')}
      </Button>
      {isAuthModalOpened && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
})

Navbar.displayName = 'Navbar'
