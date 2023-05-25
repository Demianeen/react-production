import type { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileIsLoading } from './getProfileIsLoading'

describe('getProfileIsLoading', () => {
  it('should return the is profile loading', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    }
    expect(
      getProfileIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getProfileIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
