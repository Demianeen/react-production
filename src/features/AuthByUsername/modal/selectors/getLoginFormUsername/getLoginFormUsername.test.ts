import type { DeepPartial } from '@reduxjs/toolkit'
import type { StateSchema } from 'app/providers/StoreProvider'
import { getLoginFormUsername } from 'features/AuthByUsername/modal/selectors/getLoginFormUsername/getLoginFormUsername'

describe('getLoginFormUsername', () => {
  it('should return the username', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: false,
        username: 'username',
        password: '',
      },
    }
    expect(
      getLoginFormUsername(state as StateSchema)
    ).toEqual('username')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(
      getLoginFormUsername(state as StateSchema)
    ).toEqual('')
  })
})
