import { memo } from 'react'
import { ToggleFeature } from '@/shared/lib/features'
import type { UserNavigationItemRedesignedProps } from './UserNavigationItemRedesigned/UserNavigationItemRedesigned'
import { UserNavigationItemRedesigned } from './UserNavigationItemRedesigned/UserNavigationItemRedesigned'
import { UserNavigationItemDeprecated } from './UserNavigationItemDeprecated/UserNavigationItemDeprecated'

export const UserNavigationItem = memo(
  (props: UserNavigationItemRedesignedProps) => {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={<UserNavigationItemRedesigned {...props} />}
        off={<UserNavigationItemDeprecated {...props} />}
      />
    )
  }
)

UserNavigationItem.displayName = 'UserNavigationItem'
