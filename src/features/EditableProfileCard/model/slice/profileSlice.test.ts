import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { ProfileValidationError } from 'features/EditableProfileCard/model/const/profileValidationError'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import type { ProfileSchema } from '../types/profileSchema'
import {
  profileActions,
  profileReducer,
} from './profileSlice'

const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
}

describe('profileSlice', () => {
  test('setIsReadonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      isReadonly: true,
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.setIsReadonly(false)
      )
    ).toEqual({ isReadonly: false })
  })

  test('cancelEdit', () => {
    const state: DeepPartial<ProfileSchema> = {
      isReadonly: false,
      validationErrors: [
        ProfileValidationError.MISSING_AGE,
      ],
      data,
      form: { ...data, age: undefined },
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit()
      )
    ).toEqual({
      isReadonly: true,
      validationErrors: undefined,
      form: data,
      data,
    })
  })

  test('updateProfileForm', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: {
        username: 'username',
      },
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfileForm({
          username: 'newUsername',
        })
      )
    ).toEqual({ form: { username: 'newUsername' } })
  })

  test('updateProfileData service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validationErrors: [
        ProfileValidationError.MISSING_AGE,
      ],
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending
      )
    ).toEqual({
      isLoading: true,
      validationErrors: undefined,
    })
  })

  test('updateProfileData service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validationErrors: [
        ProfileValidationError.MISSING_AGE,
      ],
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      isReadonly: true,
      data,
      form: data,
      validationErrors: undefined,
    })
  })
})
