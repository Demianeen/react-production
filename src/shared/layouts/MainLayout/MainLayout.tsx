import type { ReactNode } from 'react'
import {
  DesktopViewport,
  MobileViewport,
} from '@/shared/lib/components/Viewport'
import { useViewport } from '@/shared/lib/hooks/useViewport/useViewport'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './MainLayout.module.scss'

export interface MainLayoutProps {
  className?: string
  header: ReactNode
  content: ReactNode
  sidebar: ReactNode
  toolbar?: ReactNode
}

export const MainLayout = ({
  className,
  sidebar,
  header,
  content,
  toolbar,
}: MainLayoutProps) => {
  const { isMobile } = useViewport()

  return (
    <div
      id='mainLayout'
      className={classNamesNew(
        styles.mainLayout,
        {
          [styles.mobile]: isMobile,
        },
        className
      )}
    >
      <DesktopViewport>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.rightbar}>
          <div className={styles.header}>{header}</div>
          <div className={styles.toolbar}>{toolbar}</div>
        </div>
      </DesktopViewport>
      <MobileViewport>
        <div className={styles.header}>{header}</div>
      </MobileViewport>
      <div className={styles.content}>{content}</div>
    </div>
  )
}
