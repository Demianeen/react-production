import React, { memo, useCallback, useEffect } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { ProfileCard } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getProfileIsReadonly } from 'features/EditableProfileCard/model/selectors/getProfileIsReadonly/getProfileIsReadonly'
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm'
import {
  profileActions,
  profileReducer,
  profileSliceName,
} from 'features/EditableProfileCard/model/slice/profileSlice'
import type { Currency } from 'entities/Currency'
import type { Country } from 'entities/Country'
// eslint-disable-next-line import/no-cycle
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'

const reducersList: ReducersList = {
  [profileSliceName]: profileReducer,
}

export const EditableProfileCard = memo(() => {
  useDynamicModuleLoader(reducersList)
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const isReadonly = useSelector(getProfileIsReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstName = useCallback(
    (value: string) => {
      dispatch(
        profileActions.updateProfileForm({
          firstName: value,
        })
      )
    },
    [dispatch]
  )

  const onChangeLastName = useCallback(
    (value: string) => {
      dispatch(
        profileActions.updateProfileForm({
          lastName: value,
        })
      )
    },
    [dispatch]
  )

  const onChangeAge = useCallback(
    (value: string) => {
      if (Number.isNaN(Number(value))) return
      dispatch(
        profileActions.updateProfileForm({
          age: Number(value),
        })
      )
    },
    [dispatch]
  )

  const onChangeCity = useCallback(
    (value: string) => {
      dispatch(
        profileActions.updateProfileForm({
          city: value,
        })
      )
    },
    [dispatch]
  )

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(
        profileActions.updateProfileForm({
          username: value,
        })
      )
    },
    [dispatch]
  )

  const onChangeAvatar = useCallback(
    (value: string) => {
      dispatch(
        profileActions.updateProfileForm({
          avatar: value,
        })
      )
    },
    [dispatch]
  )

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(
        profileActions.updateProfileForm({
          currency,
        })
      )
    },
    [dispatch]
  )

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(
        profileActions.updateProfileForm({
          country,
        })
      )
    },
    [dispatch]
  )

  return (
    <>
      <EditableProfileCardHeader />
      <ProfileCard
        data={formData}
        isLoading={isLoading}
        error={error}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeUsername={onChangeUsername}
        onChangeAvatar={onChangeAvatar}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
        readonly={isReadonly}
      />
    </>
  )
})

EditableProfileCard.displayName = 'EditableProfileCard'
