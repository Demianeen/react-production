import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { useState, useCallback } from 'react'
import BurgerIcon from '@/shared/assets/icons/redesigned/burger.svg'
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
        <Icon
          Svg={BurgerIcon}
          className={className}
          onClick={toggleMenu}
          tooltipText='Menu'
        />
        {isMenuOpened && <NavbarBurgerMenu onClose={toggleMenu} />}
      </>
    )
  }
)
