import React from 'react'
import { ToggleFeature } from '@/shared/lib/features'
import { NotificationButtonRedesigned } from './NotificationButtonRedesigned/NotificationButtonRedesigned'
import { NotificationButtonDeprecated } from './NotificationButtonDeprecated/NotificationButtonDeprecated'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({
  className,
}: NotificationButtonProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<NotificationButtonRedesigned className={className} />}
      off={<NotificationButtonDeprecated className={className} />}
    />
  )
}
