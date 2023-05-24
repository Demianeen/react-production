import type { StateSchema } from 'app/providers/StoreProvider'
import { UserRole } from 'entities/User/model/const/userRole'
import { getIsUserManager } from './getIsUserManager'

describe('getIsUserManager', () => {
  it('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: { roles: [UserRole.ADMIN] },
      },
    }
    expect(getIsUserManager(state as StateSchema)).toEqual(
      true
    )
  })

  it('should return false', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: { roles: [UserRole.USER] },
      },
    }
    expect(getIsUserManager(state as StateSchema)).toEqual(
      false
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getIsUserManager(state as StateSchema)).toEqual(
      false
    )
  })
})
