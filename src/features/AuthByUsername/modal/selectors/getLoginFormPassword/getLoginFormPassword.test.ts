import type { StateSchema } from 'app/providers/StoreProvider'
import { loginFormSliceName } from 'features/AuthByUsername'
import { getLoginFormPassword } from './getLoginFormPassword'

describe('getLoginFormPassword', () => {
  it('should return password', () => {
    const state: DeepPartial<StateSchema> = {
      [loginFormSliceName]: {
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
