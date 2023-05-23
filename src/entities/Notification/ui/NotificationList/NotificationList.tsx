import React, { memo } from 'react'
import { useGetNotificationsQuery } from 'entities/Notification/api/notificationApiApi'
import { NotificationItem } from 'entities/Notification/ui/NotificationItem/NotificationItem'
import { VStack } from 'shared/ui/Stack'
import { CardSkeleton } from 'shared/ui/Card/CardSkeleton'

interface NotificationListProps {
  className?: string
}

export const NotificationList = memo(
  ({ className }: NotificationListProps) => {
    const { data, isLoading, isError } =
      useGetNotificationsQuery(null, {
        pollingInterval: 10000,
      })

    if (isLoading) {
      return (
        <VStack className={className} gap={1.25} maxWidth>
          <CardSkeleton width='100%' height='5.7rem' />
          <CardSkeleton width='100%' height='5.7rem' />
          <CardSkeleton width='100%' height='5.7rem' />
        </VStack>
      )
    }

    if (isError) {
      return null
    }

    return (
      <VStack className={className} gap={1.25} maxWidth>
        {data?.map((notification) => (
          <NotificationItem
            key={notification.id}
            item={notification}
          />
        ))}
      </VStack>
    )
  }
)

NotificationList.displayName = 'NotificationList'
