import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import AppLogoIcon from '@/shared/assets/icons/redesigned/logo.svg'
import styles from './SidebarRedesigned.module.scss'

export interface SidebarRedesignedProps {
  className?: string
}

export const SidebarRedesigned = typedMemo(
  ({ className }: SidebarRedesignedProps) => {
    return (
      <div
        className={classNames(styles.sidebarRedesigned, {}, [
          className,
        ])}
      >
        <AppLogoIcon />
      </div>
    )
  }
)
