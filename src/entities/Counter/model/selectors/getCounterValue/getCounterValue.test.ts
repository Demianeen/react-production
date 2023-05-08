import type { StateSchema } from 'app/providers/StoreProvider'
import { getCounterValue } from './getCounterValue'

describe('getCounterValue', () => {
  it('should return the counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    }

    expect(getCounterValue(state as StateSchema)).toEqual(
      state.counter?.value
    )
  })
})
