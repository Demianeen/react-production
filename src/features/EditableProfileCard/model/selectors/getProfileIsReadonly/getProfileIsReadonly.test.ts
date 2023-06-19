import type { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileIsReadonly } from './getProfileIsReadonly'

describe('getProfileIsReadonly', () => {
  it('should return the is profile readonly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isReadonly: false,
      },
    }
    expect(getProfileIsReadonly(state as StateSchema)).toEqual(false)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileIsReadonly(state as StateSchema)).toEqual(true)
  })
})
