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
import { useState } from 'react'
import { UserNavigation } from '@/features/UserNavigation'
import styles from './SidebarDeprecated.module.scss'

export interface SidebarDeprecatedProps {
  className?: string
}

// TODO: sidebar is rerendering after page route change
export const SidebarDeprecated = typedMemo(
  ({ className }: SidebarDeprecatedProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const onToggle = () => {
      setIsCollapsed((prev) => !prev)
    }

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
        <UserNavigation isCollapsed={isCollapsed} />
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
