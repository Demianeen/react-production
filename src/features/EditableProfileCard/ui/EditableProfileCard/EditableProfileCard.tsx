import React, { memo, useCallback, useEffect } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { ProfileCard } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import type { Currency } from 'entities/Currency'
import type { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { ProfileValidationError } from '../../model/types/profileSchema'
import {
  profileActions,
  profileReducer,
} from '../../model/slice/profileSlice'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly'
import { getProfileValidationErrors } from '../../model/selectors/getProfileValidationErrors/getProfileValidationErrors'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'

const reducersList: ReducersList = {
  profile: profileReducer,
}

export const EditableProfileCard = memo(() => {
  useDynamicModuleLoader(reducersList)

  const { t } = useTranslation('profile')

  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const isReadonly = useSelector(getProfileIsReadonly)
  const validationErrors = useSelector(
    getProfileValidationErrors
  )

  const validationErrorMessage: Record<
    ProfileValidationError,
    string
  > = {
    [ProfileValidationError.MISSING_FIRST_NAME]: t(
      'First name is required'
    ),
    [ProfileValidationError.MISSING_LAST_NAME]: t(
      'Last name is required'
    ),
    [ProfileValidationError.MISSING_AGE]: t(
      'Age is required'
    ),
    [ProfileValidationError.INCORRECT_AGE]: t(
      'You need to be at least 18 years old'
    ),
    [ProfileValidationError.MISSING_CITY]: t(
      'City is required'
    ),
    [ProfileValidationError.MISSING_USERNAME]: t(
      'Username is required'
    ),
    [ProfileValidationError.NO_DATA]: t(
      'Profile data is missing'
    ),
    [ProfileValidationError.UNKNOWN_SERVER_ERROR]: t(
      'Unknown server error happened'
    ),
  }

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchProfileData())
    }
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
      {validationErrors &&
        validationErrors.map((errCode) => (
          <Text
            key={errCode}
            theme={TextTheme.ERROR}
            text={validationErrorMessage[errCode]}
          />
        ))}
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
