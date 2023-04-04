import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpened, setIsAuthModalOpened] =
    useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
    setIsAuthModalOpened(false)
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
      <LoginModal
        isOpen={isAuthModalOpened}
        onClose={onCloseModal}
      />
    </div>
  )
}
