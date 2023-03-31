import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpened, setIsAuthModalOpened] =
    useState(false)

  const onToggleAuthModal = useCallback(() => {
    setIsAuthModalOpened((prev) => !prev)
  }, [])

  return (
    <div
      className={classNames(styles.navbar, {}, [className])}
    >
      <div className={styles.links} />
      <Button
        type='button'
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onToggleAuthModal}
      >
        {t('Login')}
      </Button>
      <Modal
        isOpen={isAuthModalOpened}
        onClose={onToggleAuthModal}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quisquam quae quod, voluptas, quibusdam,
        voluptates voluptatibus quidem quos v oluptatum quia
        quod. Quisquam quae quod, voluptas, quibusdam,
        voluptates voluptatibus quidem quos v oluptatum quia
        quod. Quisquam quae quod, voluptas, quibusdam,
        voluptates voluptatibus quidem quos v oluptatum quia
        quod. Quisquam quae quod, voluptas, quibusdam,
        voluptates voluptatibus quidem quos v oluptatum quia
        quod. Quisquam quae quod, voluptas, quibusdam,
        voluptates voluptatibus quidem quos v
      </Modal>
    </div>
  )
}
