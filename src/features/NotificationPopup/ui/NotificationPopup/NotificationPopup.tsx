import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'entities/Notification'
import { Popover } from 'shared/ui/Popups'
import styles from './NotificationPopup.module.scss'

interface NotificationPopupProps {
  className?: string
}

export const NotificationPopup = ({
  className,
}: NotificationPopupProps) => {
  return (
    <Popover
      triggerChildren={
        <Icon
          Svg={NotificationIcon}
          color='invertedPrimary'
        />
      }
      className={className}
    >
      <NotificationList className={styles.notifications} />
    </Popover>
  )
}
