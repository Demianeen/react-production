import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReactElement } from 'react'
import styles from './MainLayout.module.scss'

export interface MainLayoutProps {
  className?: string
  header: ReactElement
  content: ReactElement
  sidebar: ReactElement
  toolbar?: ReactElement
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
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.rightbar}>
        <div className={styles.header}>{header}</div>
        <div className={styles.toolbar}>{toolbar}</div>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}
