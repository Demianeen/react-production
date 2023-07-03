import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { NotificationList } from '@/entities/Notification'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { Popover } from '@/shared/ui/deprecated/Popups'
import { NotificationIcon } from '../../NotificationIcon/NotificationIcon'
import { NotificationDrawer } from '../../NotificationDrawer/NotificationDrawer'
import styles from './NotificationButtonDeprecated.module.scss'

export interface NotificationButtonDeprecatedProps {
  className?: string
}

export const NotificationButtonDeprecated = typedMemo(
  ({ className }: NotificationButtonDeprecatedProps) => {
    return (
      <>
        <DesktopView>
          <Popover
            triggerChildren={<NotificationIcon />}
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
