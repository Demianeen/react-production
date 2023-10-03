import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { AuthModal } from '@/features/AuthByUsername'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { NotificationButton } from '@/features/NotificationButton'
import { UserDropdown } from '@/features/UserDropdown'
import { useIsUserLogged } from '@/entities/User'
import { routes } from '@/shared/lib/router/routes'
import {
  DesktopViewport,
  MobileViewport,
} from '@/shared/lib/components/Media'
import { ToggleFeature } from '@/shared/lib/features'
import { NavbarBurger } from '../../NavbarBurger/NavbarBurger'
import styles from './NavbarDeprecated.module.scss'

interface NavbarDeprecatedProps {
  className?: string
}

export const NavbarDeprecated = memo(
  ({ className }: NavbarDeprecatedProps) => {
    const { t } = useTranslation()
    const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
    const isUserLogged = useIsUserLogged()

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
        className={classNames(styles.navbarDeprecated, {}, [
          className,
        ])}
        maxWidth
      >
        <MobileViewport>
          <NavbarBurger className={styles.burgerMenu} />
        </MobileViewport>
        <DesktopViewport>
          <Text
            className={styles.appName}
            theme={TextTheme.INVERTED}
            title={t('Netliukh App')}
          />
        </DesktopViewport>

        {isUserLogged ? (
          <>
            <ToggleFeature
              name='isArticleCreationEnabled'
              on={
                <AppLink
                  to={routes.articleCreate()}
                  className={styles.createLink}
                  theme={AppLinkTheme.INVERTED}
                >
                  {t('Create article')}
                </AppLink>
              }
              off={null}
            />
            <HStack gap={1} className={styles.actions}>
              <NotificationButton />
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
          <AuthModal
            isOpen={isAuthModalOpened}
            onClose={onCloseModal}
          />
        )}
      </HStack>
    )
  },
)

NavbarDeprecated.displayName = 'Navbar'
