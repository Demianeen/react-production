import React, { memo } from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'

const ProfilePage = () => {
  return (
    <div>
      <EditableProfileCard />
    </div>
  )
}

export default memo(ProfilePage)
