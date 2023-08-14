import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { useState, useCallback } from 'react'
import BurgerIcon from '@/shared/assets/icons/redesigned/burger.svg'
import BurgerIconDeprecated from '@/shared/assets/icons/deprecated/list-24-24.svg'
import { ToggleFeature } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { NavbarBurgerMenu } from '../NavbarBurgerMenu/NavbarBurgerMenu'

export interface NavbarBurgerProps {
  className?: string
}

export const NavbarBurger = typedMemo(
  ({ className }: NavbarBurgerProps) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    const toggleMenu = useCallback(() => {
      setIsMenuOpened((prev) => !prev)
    }, [])

    return (
      <>
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Icon
              Svg={BurgerIcon}
              className={className}
              onClick={toggleMenu}
              tooltipText='Menu'
            />
          }
          off={
            <Button
              type='button'
              theme={ButtonTheme.CLEAR}
              onClick={toggleMenu}
            >
              <IconDeprecated
                color='invertedPrimary'
                Svg={BurgerIconDeprecated}
                className={className}
                height={24}
                width={24}
              />
            </Button>
          }
        />
        <NavbarBurgerMenu
          isOpen={isMenuOpened}
          onClose={toggleMenu}
        />
      </>
    )
  }
)
