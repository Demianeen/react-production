import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { ProfileCard } from '@/entities/Profile'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { Currency } from '@/entities/Currency'
import type { Country } from '@/entities/Country'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Typography } from '@/shared/ui/redesigned/Typography'
import { ToggleFeature } from '@/shared/lib/features'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { useConfirmBeforeLeave } from '@/shared/lib/hooks/useConfirmBeforeLeave/useConfirmBeforeLeave'
import { useProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { ProfileValidationError } from '../../model/const/profileValidationError'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { fetchProfileDataById } from '../../model/services/fetchProfileDataById/fetchProfileDataById'
import {
  profileActions,
  profileReducer,
} from '../../model/slice/profileSlice'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { useProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { useProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { useProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly'
import { useProfileValidationErrors } from '../../model/selectors/getProfileValidationErrors/getProfileValidationErrors'

interface EditableProfileCardProps {
  id: number
}

const reducersList: AsyncReducersList = {
  profile: profileReducer,
}

export const EditableProfileCard = memo(
  ({ id }: EditableProfileCardProps) => {
    useDynamicModuleLoader(reducersList)
    const { t } = useTranslation('profile')

    const dispatch = useAppDispatch()
    const formData = useProfileForm()
    const isLoading = useProfileIsLoading()
    const error = useProfileError()
    const isReadonly = useProfileIsReadonly()
    const validationErrors = useProfileValidationErrors()

    useConfirmBeforeLeave(!isReadonly)

    const validationErrorMessage: Record<
      ProfileValidationError,
      string
    > = {
      [ProfileValidationError.MISSING_FIRST_NAME]: t(
        'First name is required',
      ),
      [ProfileValidationError.MISSING_LAST_NAME]: t(
        'Last name is required',
      ),
      [ProfileValidationError.MISSING_AGE]: t('Age is required'),
      [ProfileValidationError.INCORRECT_AGE]: t(
        'You need to be at least 18 years old',
      ),
      [ProfileValidationError.MISSING_CITY]: t('City is required'),
      [ProfileValidationError.MISSING_USERNAME]: t(
        'Username is required',
      ),
      [ProfileValidationError.NO_DATA]: t('Profile data is missing'),
      [ProfileValidationError.UNKNOWN_SERVER_ERROR]: t(
        'Unknown server error happened',
      ),
    }

    useEffect(() => {
      dispatch(fetchProfileDataById(Number(id)))
    }, [dispatch, id])

    const onChangeFirstName = useCallback(
      (value: string) => {
        dispatch(
          profileActions.updateProfileForm({
            firstName: value,
          }),
        )
      },
      [dispatch],
    )

    const onChangeLastName = useCallback(
      (value: string) => {
        dispatch(
          profileActions.updateProfileForm({
            lastName: value,
          }),
        )
      },
      [dispatch],
    )

    const onChangeAge = useCallback(
      (value: string) => {
        if (Number.isNaN(Number(value))) return
        dispatch(
          profileActions.updateProfileForm({
            age: Number(value),
          }),
        )
      },
      [dispatch],
    )

    const onChangeCity = useCallback(
      (value: string) => {
        dispatch(
          profileActions.updateProfileForm({
            city: value,
          }),
        )
      },
      [dispatch],
    )

    const onChangeUsername = useCallback(
      (value: string) => {
        dispatch(
          profileActions.updateProfileForm({
            username: value,
          }),
        )
      },
      [dispatch],
    )

    const onChangeAvatar = useCallback(
      (value: string) => {
        dispatch(
          profileActions.updateProfileForm({
            avatar: value,
          }),
        )
      },
      [dispatch],
    )

    const onChangeCurrency = useCallback(
      (currency: Currency) => {
        dispatch(
          profileActions.updateProfileForm({
            currency,
          }),
        )
      },
      [dispatch],
    )

    const onChangeCountry = useCallback(
      (country: Country) => {
        dispatch(
          profileActions.updateProfileForm({
            country,
          }),
        )
      },
      [dispatch],
    )

    const onSubmit = useCallback(
      () => dispatch(updateProfileData()),
      [dispatch],
    )

    return (
      <VStack gap={1.25} maxWidth>
        <EditableProfileCardHeader />
        {validationErrors &&
          validationErrors.map((errCode) => (
            <ToggleFeature
              key={errCode}
              name='isAppRedesigned'
              on={
                <Typography
                  variant='error'
                  data-testid='EditableProfileCard.Error'
                >
                  {validationErrorMessage[errCode]}
                </Typography>
              }
              off={
                <Text
                  key={errCode}
                  theme={TextTheme.ERROR}
                  text={validationErrorMessage[errCode]}
                  data-testid='EditableProfileCard.Error'
                />
              }
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
          onSubmit={onSubmit}
          formId='editable-profile-card'
        />
      </VStack>
    )
  },
)

EditableProfileCard.displayName = 'EditableProfileCard'
