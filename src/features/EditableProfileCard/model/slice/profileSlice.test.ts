import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { ProfileValidationError } from '../const/profileValidationError'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import type { EditableProfileSchema } from '../types/editableProfileSchema'
import { profileActions, profileReducer } from './profileSlice'

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
    const state: DeepPartial<EditableProfileSchema> = {
      isReadonly: true,
    }
    expect(
      profileReducer(
        state as EditableProfileSchema,
        profileActions.setIsReadonly(false)
      )
    ).toEqual({ isReadonly: false })
  })

  test('cancelEdit', () => {
    const state: DeepPartial<EditableProfileSchema> = {
      isReadonly: false,
      validationErrors: [ProfileValidationError.MISSING_AGE],
      data,
      form: { ...data, age: undefined },
    }

    expect(
      profileReducer(
        state as EditableProfileSchema,
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
    const state: DeepPartial<EditableProfileSchema> = {
      form: {
        username: 'username',
      },
    }
    expect(
      profileReducer(
        state as EditableProfileSchema,
        profileActions.updateProfileForm({
          username: 'newUsername',
        })
      )
    ).toEqual({ form: { username: 'newUsername' } })
  })

  test('updateProfileData service pending', () => {
    const state: DeepPartial<EditableProfileSchema> = {
      isLoading: false,
      validationErrors: [ProfileValidationError.MISSING_AGE],
    }

    expect(
      profileReducer(
        state as EditableProfileSchema,
        updateProfileData.pending
      )
    ).toEqual({
      isLoading: true,
      validationErrors: undefined,
    })
  })

  test('updateProfileData service fulfilled', () => {
    const state: DeepPartial<EditableProfileSchema> = {
      isLoading: false,
      validationErrors: [ProfileValidationError.MISSING_AGE],
    }

    expect(
      profileReducer(
        state as EditableProfileSchema,
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
