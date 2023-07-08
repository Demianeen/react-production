import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { getIsUserLogged } from '@/entities/User'
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LoginModal } from '@/features/AuthByUsername'
import { NotificationButton } from '@/features/NotificationButton'
import { UserDropdown } from '@/features/UserDropdown'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import styles from './NavbarRedesigned.module.scss'

export interface NavbarRedesignedProps {
  className?: string
}

export const NavbarRedesigned = typedMemo(
  ({ className }: NavbarRedesignedProps) => {
    const { t } = useTranslation()
    const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
    const isUserLogged = useSelector(getIsUserLogged)

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
        className={classNames(styles.navbarRedesigned, {}, [
          className,
        ])}
        maxWidth
      >
        {isUserLogged ? (
          <>
            <NotificationButton />
            <UserDropdown />
          </>
        ) : (
          <Button
            type='button'
            variant='clear'
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
  }
)
