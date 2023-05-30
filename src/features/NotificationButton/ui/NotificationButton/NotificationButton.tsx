import React from 'react'
import { NotificationList } from '@/entities/Notification'
import { Popover } from '@/shared/ui/Popups'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { Icon } from '@/shared/ui/Icon/Icon'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { NotificationDrawer } from '../NotificationDrawer/NotificationDrawer'
import styles from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
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
              Svg={NotificationIcon}
              color='invertedPrimary'
              className={className}
            />
          }
          className={className}
        >
          <NotificationList
            className={styles.notifications}
          />
        </Popover>
      </DesktopView>
      <MobileView>
        <NotificationDrawer />
      </MobileView>
    </>
  )
}
