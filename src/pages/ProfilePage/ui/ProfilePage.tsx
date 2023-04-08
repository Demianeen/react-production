import React, { memo, useEffect } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import {
  fetchProfileData,
  ProfileCard,
  profileReducer,
} from 'entities/Profile'
import { profileSliceName } from 'entities/Profile/model/slice/profileSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

const reducersList: ReducersList = {
  [profileSliceName]: profileReducer,
}

const ProfilePage = memo(() => {
  useDynamicModuleLoader(reducersList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // @ts-expect-error TODO: fix this
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <div>
      <ProfileCard />
    </div>
  )
})

ProfilePage.displayName = 'ProfilePage'

export default ProfilePage
