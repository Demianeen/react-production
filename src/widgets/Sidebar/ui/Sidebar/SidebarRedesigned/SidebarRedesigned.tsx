import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { useState, useCallback } from 'react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ArrowIcon from '@/shared/assets/icons/redesigned/arrow-down.svg'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { Card } from '@/shared/ui/redesigned/Card'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useMedia } from '@/shared/lib/hooks/useMedia/useMedia'
import { UserNavigation } from '@/features/UserNavigation'
import styles from './SidebarRedesigned.module.scss'

export interface SidebarRedesignedProps {
  className?: string
}

export const SidebarRedesigned = typedMemo(
  ({ className }: SidebarRedesignedProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const onToggle = () => {
      setIsCollapsed((prev) => !prev)
    }

    const onResize = useCallback(() => {
      if (window.innerWidth < 1175) {
        setIsCollapsed(true)
      }
    }, [])

    useMedia(onResize)

    return (
      <Card
        background='light'
        className={classNamesNew(
          styles.sidebarRedesigned,
          {
            [styles.collapsed]: isCollapsed,
          },
          className
        )}
        padding={0}
      >
        <div className={styles.logoWrapper}>
          <AppLogo
            size={isCollapsed ? '2rem' : '3.5rem'}
            className={styles.logo}
            showGradientBig={!isCollapsed}
          />
        </div>
        <UserNavigation isCollapsed={isCollapsed} />
        <Icon
          Svg={ArrowIcon}
          data-testid='sidebar-toggle'
          className={styles.toggleBtn}
          onClick={onToggle}
          tooltipPosition='right'
          tooltipText='Toggle sidebar'
        />
        <HStack
          justify='center'
          gap={1}
          maxWidth
          className={styles.switchers}
        >
          <ThemeSwitcher
            tooltipPosition={isCollapsed ? 'right' : 'top'}
          />
          <LangSwitcher
            short={isCollapsed}
            tooltipPosition={isCollapsed ? 'right' : 'top'}
          />
        </HStack>
      </Card>
    )
  }
)
