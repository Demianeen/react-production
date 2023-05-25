import type { StateSchema } from '@/app/providers/StoreProvider'
import { UserRole } from '@/entities/User/model/const/userRole'
import { getIsUserAdmin } from './getIsUserAdmin'

describe('getIsUserAdmin', () => {
  it('should return the true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: { roles: [UserRole.ADMIN] },
      },
    }
    expect(getIsUserAdmin(state as StateSchema)).toEqual(
      true
    )
  })

  it('should return the false', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: { roles: [UserRole.USER] },
      },
    }
    expect(getIsUserAdmin(state as StateSchema)).toEqual(
      false
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getIsUserAdmin(state as StateSchema)).toEqual(
      false
    )
  })
})
