import { ToggleFeature } from '@/shared/lib/features'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon'
import NotificationIconIcon from '@/shared/assets/icons/redesigned/notification.svg'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type { ForwardedRef } from 'react'

export interface NotificationIconProps {
  className?: string
  onClick?: () => void
}

export const NotificationIcon = typedMemo(
  typedForwardRef(
    (
      { className, onClick }: NotificationIconProps,
      ref: ForwardedRef<SVGSVGElement>
    ) => {
      return (
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Icon
              Svg={NotificationIconIcon}
              className={className}
              onClick={onClick}
              ref={ref}
            />
          }
          off={
            <IconDeprecated
              Svg={NotificationIconIcon}
              color='invertedPrimary'
              className={className}
              style={{
                width: 30,
                height: 30,
              }}
            />
          }
        />
      )
    }
  )
)
