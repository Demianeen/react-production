import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { profileReducer } from 'entities/Profile'
import { profileSliceName } from 'entities/Profile/model/slice/profileSlice'

const reducersList: ReducersList = {
  [profileSliceName]: profileReducer,
}

const ProfilePage = memo(() => {
  useDynamicModuleLoader(reducersList)
  const { t } = useTranslation()

  return <div>{t('BOBOB')}</div>
})

ProfilePage.displayName = 'ProfilePage'

export default ProfilePage
