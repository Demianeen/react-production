import { getCounterValue } from 'entities/Counter/model/selectors/getCounterValue/getCounterValue'

import type { StateSchema } from 'app/providers/StoreProvider'

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
