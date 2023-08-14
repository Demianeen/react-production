import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { UserNavigation } from '@/features/UserNavigation'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { FullPagePanel } from '@/shared/ui/redesigned/FullPagePanel'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Br } from '@/shared/ui/redesigned/Br'
import styles from './NavbarBurgerMenu.module.scss'

export interface NavbarBurgerMenuProps {
  className?: string
  onClose?: () => void
  isOpen?: boolean
}

export const NavbarBurgerMenu = typedMemo(
  ({ className, onClose, isOpen }: NavbarBurgerMenuProps) => {
    return (
      <FullPagePanel
        onClose={onClose}
        isOpen={isOpen}
        className={className}
      >
        <HStack maxWidth justify='between' className={styles.actions}>
          <ThemeSwitcher withText />
          <LangSwitcher />
        </HStack>
        <Br />
        <UserNavigation onItemClick={onClose} />
      </FullPagePanel>
    )
  }
)
