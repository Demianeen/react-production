import { memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/Button'
import { HStack, VStack } from '@/shared/ui/Stack'
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

// FIXME: sidebar is rerendering after page route change
export const Sidebar = memo(
  ({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const sidebarItems = useSelector(getSidebarItems)

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
      <VStack
        className={classNames(
          styles.sidebar,
          {
            [styles.collapsed]: isCollapsed,
          },
          [className]
        )}
        data-testid='sidebar'
        justify='between'
        as='section'
      >
        <Button
          data-testid='sidebar-toggle'
          theme={ButtonTheme.BACKGROUND_INVERTED}
          className={styles.toggleBtn}
          onClick={onToggle}
          square
          size={ButtonSize.L}
          type='button'
        >
          {isCollapsed ? '>' : '<'}
        </Button>
        <nav className={styles.itemsContainer}>
          <VStack gap={1} className={styles.items} as='ul'>
            {itemsList}
          </VStack>
        </nav>
        <HStack
          justify='center'
          gap={1.25}
          maxWidth
          className={styles.switchers}
        >
          <ThemeSwitcher />
          <LangSwitcher short={isCollapsed} />
        </HStack>
      </VStack>
    )
  }
)

Sidebar.displayName = 'Sidebar'
