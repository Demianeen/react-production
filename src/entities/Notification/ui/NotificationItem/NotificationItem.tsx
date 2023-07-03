import { ToggleFeature } from '@/shared/lib/features'
import { NotificationItemDeprecated } from './NotificationItemDeprecated/NotificationItemDeprecated'
import type { NotificationItemRedesignedProps } from './NotificationItemRedesigned/NotificationItemRedesigned'
import { NotificationItemRedesigned } from './NotificationItemRedesigned/NotificationItemRedesigned'

export interface NotificationItemProps {
  className?: string
}

export const NotificationItem = ({
  className,
  item,
}: NotificationItemProps & NotificationItemRedesignedProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <NotificationItemRedesigned
          item={item}
          className={className}
        />
      }
      off={
        <NotificationItemDeprecated
          item={item}
          className={className}
        />
      }
    />
  )
}
