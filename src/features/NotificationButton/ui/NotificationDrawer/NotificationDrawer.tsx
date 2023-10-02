import React, { memo, useCallback, useState } from 'react'
import { NotificationList } from '@/entities/Notification'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { ToggleFeature } from '@/shared/lib/features'
import { NotificationIcon } from '../NotificationIcon/NotificationIcon'

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
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <>
            <NotificationIcon
              onClick={onOpenDrawer}
              className={className}
            />
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
              <NotificationList />
            </Drawer>
          </>
        }
        off={
          <>
            <ButtonDeprecated
              type='button'
              theme={ButtonTheme.CLEAR}
              onClick={onOpenDrawer}
              className={className}
            >
              <NotificationIcon />
            </ButtonDeprecated>
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
              <NotificationList />
            </Drawer>
          </>
        }
      />
    )
  }
)

NotificationDrawer.displayName = 'NotificationDrawer'
