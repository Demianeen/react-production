import React, { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, CardTheme } from '@/shared/ui/deprecated/Card'
import { Text } from '@/shared/ui/deprecated/Text'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import styles from './NotificationItemDeprecated.module.scss'
import type { Notification } from '../../../model/types/notification'

interface NotificationItemDeprecatedProps {
  className?: string
  item: Notification
}

export const NotificationItemDeprecated = memo(
  ({ className, item }: NotificationItemDeprecatedProps) => {
    const content = (
      <Card
        theme={CardTheme.OUTLINE}
        className={classNames(styles.notificationItem, {}, [
          className,
        ])}
      >
        <Text title={item.title} text={item.description} />
      </Card>
    )

    if (item.href) {
      return (
        <AppLink
          to={item.href}
          target='_blank'
          className={styles.link}
          rel='noreferrer'
        >
          {content}
        </AppLink>
      )
    }

    return content
  }
)

NotificationItemDeprecated.displayName = 'NotificationItem'
