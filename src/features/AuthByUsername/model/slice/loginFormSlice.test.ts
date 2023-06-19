import type { LoginFormSchema } from '../types/loginFormSchema'
import { loginActions, loginReducer } from './loginFormSlice'

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
