import type { StateSchema } from '@/app/providers/StoreProvider'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { getProfileState } from './getProfileState'

describe('getProfileState', () => {
  it('should return the profile state', () => {
    const data = {
      firstName: 'Demian',
      lastName: 'Netliukh',
      age: 30,
      currency: Currency.USD,
      country: Country.UK,
      city: 'London',
      username: 'admin',
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    }
    expect(getProfileState(state as StateSchema)).toEqual(
      state.profile
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileState(state as StateSchema)).toEqual(undefined)
  })
})
