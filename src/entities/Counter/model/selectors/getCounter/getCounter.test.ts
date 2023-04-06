import type { DeepPartial } from '@reduxjs/toolkit'
import type { StateSchema } from 'app/providers/StoreProvider'
import { getCounter } from './getCounter'

describe('getCounter', () => {
  it('should return the counter state', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    }

    expect(getCounter(state as StateSchema)).toEqual(
      state.counter
    )
  })
})
