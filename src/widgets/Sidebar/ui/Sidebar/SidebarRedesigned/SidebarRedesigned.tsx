import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { useState, useMemo } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ArrowIcon from '@/shared/assets/icons/redesigned/arrow-down.svg'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { useSidebarItems } from '../../../model/selectors/getSidebarItems/getSidebarItems'
import { SidebarItem } from '../../SidebarItem/SidebarItem'
import styles from './SidebarRedesigned.module.scss'

export interface SidebarRedesignedProps {
  className?: string
}

export const SidebarRedesigned = typedMemo(
  ({ className }: SidebarRedesignedProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const sidebarItems = useSidebarItems()

    const onToggle = () => {
      setIsCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(() => {
      return sidebarItems.map((item) => (
        <SidebarItem
          item={item}
          isCollapsed={isCollapsed}
          key={item.path}
        />
      ))
    }, [isCollapsed, sidebarItems])

    return (
      <div
        className={classNames(
          styles.sidebarRedesigned,
          {
            [styles.collapsed]: isCollapsed,
          },
          [className]
        )}
      >
        <AppLogo
          size={isCollapsed ? '2rem' : '3.5rem'}
          className={styles.logo}
        />
        <nav>
          <VStack gap={1} className={styles.items} as='ul'>
            {itemsList}
          </VStack>
        </nav>
        <Icon
          Svg={ArrowIcon}
          data-testid='sidebar-toggle'
          className={styles.toggleBtn}
          onClick={onToggle}
        />
        <HStack
          justify='center'
          gap={1}
          maxWidth
          className={styles.switchers}
        >
          <ThemeSwitcher />
          <LangSwitcher short={isCollapsed} />
        </HStack>
      </div>
    )
  }
)
