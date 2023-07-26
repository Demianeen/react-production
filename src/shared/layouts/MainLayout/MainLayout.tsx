import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReactNode } from 'react'

import {
  DesktopMedia,
  MobileMedia,
} from '@/shared/lib/components/Media'
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
  return (
    <div
      id='mainLayout'
      className={classNames(styles.mainLayout, {}, [className])}
    >
      <DesktopMedia>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.rightbar}>
          <div className={styles.header}>{header}</div>
          <div className={styles.toolbar}>{toolbar}</div>
        </div>
      </DesktopMedia>
      <MobileMedia>
        <div className={styles.header}>{header}</div>
      </MobileMedia>
      <div className={styles.content}>{content}</div>
    </div>
  )
}
