import { NotificationList } from 'entities/Notification'
import { Popover } from 'shared/ui/Popups'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import React from 'react'
import { DesktopView } from 'shared/lib/components/UserAgent/DesktopView'
import { MobileView } from 'shared/lib/components/UserAgent/MobileView'
import { NotificationDrawer } from 'features/NotificationButton/ui/NotificationDrawer/NotificationDrawer'

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
          <NotificationList />
        </Popover>
      </DesktopView>
      <MobileView>
        <NotificationDrawer />
      </MobileView>
    </>
  )
}
