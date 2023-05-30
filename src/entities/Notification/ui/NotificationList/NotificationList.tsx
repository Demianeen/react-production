import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { VStack } from '@/shared/ui/Stack'
import { CardSkeleton } from '@/shared/ui/Card'
import { Text, TextAlign } from '@/shared/ui/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserId } from '@/entities/User'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { useGetNotificationsQuery } from '../../api/notificationApi'
import styles from './NotificationList.module.scss'

interface NotificationListProps {
  className?: string
}

export const NotificationList = memo(
  ({ className }: NotificationListProps) => {
    const { t } = useTranslation()
    const userId = useSelector(getUserId)
    const { data, isLoading, isError } =
      useGetNotificationsQuery(userId ?? skipToken, {
        pollingInterval: 10000,
      })

    if (isLoading) {
      return (
        <VStack
          className={classNames('', {}, [
            className,
            styles.skeletonWrapper,
          ])}
          gap={1.25}
          maxWidth
        >
          <CardSkeleton height='5.7rem' />
          <CardSkeleton width='100%' height='5.7rem' />
          <CardSkeleton width='100%' height='5.7rem' />
        </VStack>
      )
    }

    if (isError) {
      return (
        <VStack className={className} gap={1.25} maxWidth>
          <Text
            text={`${t(
              'Cannot load notification right now'
            )}. ${t('Try again later')}`}
          />
        </VStack>
      )
    }

    if (data === undefined || data.length === 0) {
      return (
        <VStack className={className} gap={1.25} maxWidth>
          <Text
            text={t('No notifications')}
            align={TextAlign.CENTER}
          />
        </VStack>
      )
    }

    return (
      <VStack className={className} gap={1.25} maxWidth>
        {data.map((notification) => (
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
