import React, { memo } from 'react'
// eslint-disable-next-line import/no-cycle
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
