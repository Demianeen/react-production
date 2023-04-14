import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { fetchProfileData } from './fetchProfileData'

describe('fetchProfileData', () => {
  test('fulfilled', async () => {
    const data = {
      firstName: 'Demian',
      lastName: 'Netliukh',
      age: 30,
      currency: Currency.USD,
      country: Country.UK,
      city: 'London',
      username: 'admin',
    }

    const returnValue = {
      data,
    }

    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(
      Promise.resolve(returnValue)
    )
    const result = await thunk.call()

    expect(result.payload).toEqual(data)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        status: 403,
      })
    )
    const result = await thunk.call()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })

  test('no data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        data: undefined,
      })
    )
    const result = await thunk.call()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
