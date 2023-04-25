import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import type { ProfileSchema } from '../types/profile.types'
import { ValidateProfileError } from '../types/profile.types'
import {
  profileActions,
  profileReducer,
} from './profileSlice'

const data = {
  username: 'admin',
  age: 38,
  country: Country.Ukraine,
  lastname: 'maks',
  first: 'asd',
  city: 'asf',
  currency: Currency.USD,
}

describe('profileSlice.test', () => {
  test('set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.setReadonly(true)
      )
    ).toEqual({ readonly: true })
  })

  test('cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: '' },
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit()
      )
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    })
  })

  test('update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: '123' },
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: '123456',
        })
      )
    ).toEqual({
      form: { username: '123456' },
    })
  })

  test('update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending
      )
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    })
  })

  test('update profile service fullfiled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      validateError: undefined,
      form: data,
      data,
    })
  })
})
