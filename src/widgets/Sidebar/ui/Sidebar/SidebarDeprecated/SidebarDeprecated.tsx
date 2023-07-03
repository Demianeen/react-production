import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import {
  Button,
  ButtonTheme,
  ButtonSize,
} from '@/shared/ui/deprecated/Button'
import { VStack, HStack } from '@/shared/ui/redesigned/Stack'
import { useMemo, useState } from 'react'
import { SidebarItem } from '../../SidebarItem/SidebarItem'
import { useSidebarItems } from '../../../model/selectors/getSidebarItems/getSidebarItems'
import styles from './SidebarDeprecated.module.scss'

export interface SidebarDeprecatedProps {
  className?: string
}

// TODO: sidebar is rerendering after page route change
export const SidebarDeprecated = typedMemo(
  ({ className }: SidebarDeprecatedProps) => {
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
          squared
          size={ButtonSize.L}
          type='button'
        >
          {isCollapsed ? '>' : '<'}
        </Button>
        <nav>
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
