import React, { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { HStack, VStack } from 'shared/ui/Stack'
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

// TODO: sidebar is rerendering after page route change
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
      // FIXME: section
      <VStack
        className={classNames(
          styles.sidebar,
          {
            [styles.collapsed]: isCollapsed,
          },
          [className]
        )}
        data-testid='sidebar'
        // justify={isCollapsed ? 'center' : 'flex-start'}
        justify='between'
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
          {/* FIXME: here need to be ul, not div */}
          <VStack gap={1} className={styles.items}>
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
