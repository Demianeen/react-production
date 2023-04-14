import React, { memo } from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'

const ProfilePage = memo(() => {
  return (
    <div>
      <EditableProfileCard />
    </div>
  )
})

ProfilePage.displayName = 'ProfilePage'

export default ProfilePage
