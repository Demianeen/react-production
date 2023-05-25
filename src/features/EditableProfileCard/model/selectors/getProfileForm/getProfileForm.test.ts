import type { StateSchema } from '@/app/providers/StoreProvider'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { getProfileForm } from './getProfileForm'

describe('getProfileForm', () => {
  it('should return the profile form', () => {
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
        form: data,
      },
    }
    expect(getProfileForm(state as StateSchema)).toEqual(
      data
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileForm(state as StateSchema)).toEqual(
      undefined
    )
  })
})
