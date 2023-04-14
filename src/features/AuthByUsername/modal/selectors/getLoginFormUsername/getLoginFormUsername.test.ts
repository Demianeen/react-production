import type { StateSchema } from 'app/providers/StoreProvider'
import { loginFormSliceName } from 'features/AuthByUsername'
import { getLoginFormUsername } from './getLoginFormUsername'

describe('getLoginFormUsername', () => {
  it('should return the username', () => {
    const state: DeepPartial<StateSchema> = {
      [loginFormSliceName]: {
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
