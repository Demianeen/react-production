import {
  loginActions,
  loginReducer,
} from 'features/AuthByUsername/modal/slice/loginFormSlice'
import type { DeepPartial } from '@reduxjs/toolkit'
import type { LoginFormSchema } from 'features/AuthByUsername'

describe('loginSlice', () => {
  test('setUsername', () => {
    const state: DeepPartial<LoginFormSchema> = {
      username: 'username',
    }
    expect(
      loginReducer(
        state as LoginFormSchema,
        loginActions.setUsername('newUsername')
      )
    ).toEqual({
      username: 'newUsername',
    })
  })

  test('setPassword', () => {
    const state: DeepPartial<LoginFormSchema> = {
      password: 'password',
    }

    expect(
      loginReducer(
        state as LoginFormSchema,
        loginActions.setPassword('newPassword')
      )
    ).toEqual({ password: 'newPassword' })
  })
})
