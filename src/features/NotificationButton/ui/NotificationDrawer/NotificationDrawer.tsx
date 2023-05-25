import React, { memo, useCallback, useState } from 'react'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { NotificationList } from '@/entities/Notification'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { Icon } from '@/shared/ui/Icon/Icon'
import {
  Button,
  ButtonTheme,
} from '@/shared/ui/Button/Button'

interface NotificationDrawerProps {
  className?: string
}

export const NotificationDrawer = memo(
  ({ className }: NotificationDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
      setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
      setIsOpen(false)
    }, [])

    return (
      <>
        <Button
          type='button'
          theme={ButtonTheme.CLEAR}
          onClick={onOpenDrawer}
        >
          <Icon
            Svg={NotificationIcon}
            color='invertedPrimary'
            className={className}
          />
        </Button>
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </>
    )
  }
)

NotificationDrawer.displayName = 'NotificationDrawer'
