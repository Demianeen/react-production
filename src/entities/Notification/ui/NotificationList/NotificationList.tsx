import { ToggleFeature } from '@/shared/lib/features'
import { NotificationListRedesigned } from './NotificationListRedesigned/NotificationListRedesigned'
import { NotificationListDeprecated } from './NotificationListDeprecated/NotificationListDeprecated'

export interface NotificationListProps {
  className?: string
}

export const NotificationList = ({
  className,
}: NotificationListProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<NotificationListRedesigned className={className} />}
      off={<NotificationListDeprecated className={className} />}
    />
  )
}
