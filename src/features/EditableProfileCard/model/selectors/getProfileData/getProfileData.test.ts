import type { StateSchema } from '@/app/providers/StoreProvider'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { getProfileData } from './getProfileData'

describe('getProfileData', () => {
  it('should return the profile data', () => {
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
    expect(getProfileData(state as StateSchema)).toEqual(
      data
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileData(state as StateSchema)).toEqual(
      undefined
    )
  })
})
