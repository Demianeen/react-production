import type { DeepPartial } from '@reduxjs/toolkit'
import { getLoginFormPassword } from 'features/AuthByUsername/modal/selectors/getLoginFormPassword/getLoginFormPassword'
import type { StateSchema } from 'app/providers/StoreProvider'

describe('getLoginFormPassword', () => {
  it('should return password', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: false,
        username: '',
        password: 'password',
      },
    }
    expect(
      getLoginFormPassword(state as StateSchema)
    ).toEqual('password')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(
      getLoginFormPassword(state as StateSchema)
    ).toEqual('')
  })
})
