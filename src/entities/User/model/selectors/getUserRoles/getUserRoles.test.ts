import type { StateSchema } from 'app/providers/StoreProvider'
import { UserRole } from '../../types/userSchema'
import { getUserRoles } from './getUserRoles'

describe('getUserRoles', () => {
  it('should return the roles', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          roles: [UserRole.ADMIN],
        },
      },
    }
    expect(getUserRoles(state as StateSchema)).toEqual([
      UserRole.ADMIN,
    ])
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getUserRoles(state as StateSchema)).toEqual([
      UserRole.USER,
    ])
  })
})
