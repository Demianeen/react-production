import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/redesigned/Card'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Title } from '@/shared/ui/redesigned/Title'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import styles from './NotificationItemRedesigned.module.scss'
import type { Notification } from '../../../model/types/notification'

export interface NotificationItemRedesignedProps {
  className?: string
  item: Notification
}

export const NotificationItemRedesigned = typedMemo(
  ({ className, item }: NotificationItemRedesignedProps) => {
    const content = (
      <VStack
        as={Card}
        className={classNames(styles.notificationItem, {}, [
          className,
        ])}
        padding={0}
        maxWidth
      >
        <Title level={2} className={styles.title}>
          {item.title}
        </Title>
        <p>{item.description}</p>
      </VStack>
    )

    if (item.href) {
      return (
        <VStack
          as={AppLink}
          to={item.href}
          target='_blank'
          className={styles.link}
          rel='noreferrer'
          maxWidth
        >
          {content}
        </VStack>
      )
    }

    return content
  }
)
