import React from 'react'
import { NotificationList } from '@/entities/Notification'
import { Popover } from '@/shared/ui/deprecated/Popups'
import NotificationIcon from '@/shared/assets/icons/deprecated/notification-20-20.svg'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { NotificationDrawer } from '../NotificationDrawer/NotificationDrawer'
import styles from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

const Notification = () => {
  return <Icon Svg={NotificationIcon} width={20} height={20} />
}

export const NotificationButton = ({
  className,
}: NotificationButtonProps) => {
  return (
    <>
      <DesktopView>
        <Popover
          triggerChildren={
            <Icon
              Svg={Notification}
              color='invertedPrimary'
              className={className}
            />
          }
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
