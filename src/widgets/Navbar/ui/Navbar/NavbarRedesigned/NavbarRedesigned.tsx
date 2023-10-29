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
import { Icon } from '@/shared/ui/redesigned/Icon'
import EditIcon from '@/shared/assets/icons/redesigned/edit.svg'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { routes } from '@/shared/lib/router/routes'
import { ToggleFeature } from '@/shared/lib/features'
import { TooltipButton } from '@/shared/ui/redesigned/TooltipButton'
import { NavbarBurger } from '../../NavbarBurger/NavbarBurger'
import styles from './NavbarRedesigned.module.scss'

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
        align='center'
        className={classNamesNew(
          styles.navbarRedesigned,
          {
            [styles.mobile]: isMobile,
          },
          className,
        )}
        maxWidth
      >
        <MobileViewport>
          <NavbarBurger className={styles.burgerMenu} />
        </MobileViewport>
        <HStack gap={1}>
          {isUserLogged ? (
            <>
              <ToggleFeature
                name='isArticleCreationEnabled'
                on={
                  <HStack
                    as={AppLink}
                    to={routes.articleCreate()}
                    align='center'
                    tabIndex={-1}
                  >
                    <TooltipButton
                      type='button'
                      variant='clear'
                      tooltipText={t('Create article')}
                    >
                      <Icon
                        Svg={EditIcon}
                        clickable
                        noWrapWithButton
                      />
                    </TooltipButton>
                  </HStack>
                }
                off={null}
              />
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
  },
)
