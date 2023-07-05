import { ToggleFeature } from '@/shared/lib/features'
import type { ProfileCardRedesignedProps } from './ProfileCardRedesigned/ProfileCardRedesigned'
import { ProfileCardRedesigned } from './ProfileCardRedesigned/ProfileCardRedesigned'
import { ProfileCardDeprecated } from './ProfileCardDeprecated/ProfileCardDeprecated'

export interface ProfileCardProps {
  className?: string
}

export const ProfileCard = (
  props: ProfileCardProps & ProfileCardRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  )
}
