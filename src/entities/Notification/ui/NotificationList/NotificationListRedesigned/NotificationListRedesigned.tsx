import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { CardSkeleton } from '@/shared/ui/deprecated/Card'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserId } from '@/entities/User'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { NotificationItem } from '../../NotificationItem/NotificationItem'
import { useGetNotificationsQuery } from '../../../api/notificationApi'
import styles from './NotificationListRedesigned.module.scss'

interface NotificationListRedesignedProps {
  className?: string
}

export const NotificationListRedesigned = typedMemo(
  ({ className }: NotificationListRedesignedProps) => {
    const { t } = useTranslation()
    const userId = useSelector(getUserId)
    const { data, isLoading, isError } = useGetNotificationsQuery(
      userId ?? skipToken,
      {
        pollingInterval: 10000,
      }
    )

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
