import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { useIsUserLogged } from '@/entities/User'
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthModal } from '@/features/AuthByUsername'
import { NotificationButton } from '@/features/NotificationButton'
import { UserDropdown } from '@/features/UserDropdown'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { useViewport } from '@/shared/lib/hooks/useViewport/useViewport'
import { MobileViewport } from '@/shared/lib/components/Media'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './NavbarRedesigned.module.scss'

import { NavbarBurger } from '../../NavbarBurger/NavbarBurger'

export interface NavbarRedesignedProps {
  className?: string
}

export const NavbarRedesigned = typedMemo(
  ({ className }: NavbarRedesignedProps) => {
    const { t } = useTranslation()
    const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
    const isUserLogged = useIsUserLogged()
    const { isMobile } = useViewport()

    const onOpenModal = useCallback(() => {
      setIsAuthModalOpened(true)
    }, [])

    const onCloseModal = useCallback(() => {
      setIsAuthModalOpened(false)
    }, [])

    return (
      <HStack
        as='header'
        justify='between'
        className={classNamesNew(
          styles.navbarRedesigned,
          {
            [styles.mobile]: isMobile,
          },
          className
        )}
        maxWidth
      >
        <MobileViewport>
          <NavbarBurger className={styles.burgerMenu} />
        </MobileViewport>
        <HStack gap={1}>
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
        </HStack>

        {isAuthModalOpened && (
          <AuthModal
            isOpen={isAuthModalOpened}
            onClose={onCloseModal}
          />
        )}
      </HStack>
    )
  }
)
