import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  DesktopView,
  MobileView,
} from '@/shared/lib/components/UserAgent'
import { Popover } from '@/shared/ui/redesigned/Popups'
import { NotificationList } from '@/entities/Notification'
import { NotificationIcon } from '../../NotificationIcon/NotificationIcon'
import { NotificationDrawer } from '../../NotificationDrawer/NotificationDrawer'
import styles from './NotificationButtonRedesigned.module.scss'

export interface NotificationButtonRedesignedProps {
  className?: string
}

// TODO: Add more notification functionality
// TODO: Fix accessability

export const NotificationButtonRedesigned = typedMemo(
  ({ className }: NotificationButtonRedesignedProps) => {
    return (
      <>
        <DesktopView>
          <Popover
            trigger={<NotificationIcon />}
            className={className}
          >
            <NotificationList className={styles.notifications} />
          </Popover>
        </DesktopView>
        <MobileView>
          <NotificationDrawer />
        </MobileView>
      </>
    )
  }
)
