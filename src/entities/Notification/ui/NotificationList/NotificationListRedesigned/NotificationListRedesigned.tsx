import React from 'react'
import { useTranslation } from 'react-i18next'
import { skipToken } from '@reduxjs/toolkit/query'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useUserId } from '@/entities/User'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { NotificationItem } from '../../NotificationItem/NotificationItem'
import { useGetNotificationsQuery } from '../../../api/notificationApi'
import styles from './NotificationListRedesigned.module.scss'

interface NotificationListRedesignedProps {
  className?: string
}

export const NotificationListRedesigned = typedMemo(
  ({ className }: NotificationListRedesignedProps) => {
    const { t } = useTranslation()
    const userId = useUserId()
    const { data, isLoading, isError, isUninitialized } =
      useGetNotificationsQuery(userId ?? skipToken, {
        pollingInterval: 10000,
      })

    if (isLoading || isUninitialized) {
      return (
        <VStack
          className={classNames('', {}, [
            className,
            styles.skeletonWrapper,
          ])}
          gap={1.25}
          maxWidth
        >
          <Skeleton height='5.7rem' />
          <Skeleton height='5.7rem' />
          <Skeleton height='5.7rem' />
        </VStack>
      )
    }

    if (isError) {
      return (
        <p>
          {t('Cannot load notification right now')}.{' '}
          {t('Try again later')}
        </p>
      )
    }

    if (data === undefined || data.length === 0) {
      return <p>{t('No notifications')}</p>
    }

    return (
      <VStack
        className={classNames(styles.notificationList, {}, [
          className,
        ])}
        maxWidth
      >
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
