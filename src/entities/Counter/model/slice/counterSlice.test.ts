import type { CounterSchema } from 'entities/Counter'
import { counterReducer } from 'entities/Counter'
import { counterActions } from 'entities/Counter/model/slice/counterSlice'

describe('counterSlice', () => {
  test('increment', () => {
    const state: DeepPartial<CounterSchema> = {
      value: 10,
    }

    expect(
      counterReducer(
        state as CounterSchema,
        counterActions.increment
      )
    ).toEqual({
      value: 11,
    })
  })

  test('decrement', () => {
    const state: DeepPartial<CounterSchema> = {
      value: 10,
    }

    expect(
      counterReducer(
        state as CounterSchema,
        counterActions.decrement
      )
    ).toEqual({
      value: 9,
    })
  })

  it('should work with empty state', () => {
    expect(
      counterReducer(undefined, counterActions.increment)
    ).toEqual({
      value: 1,
    })
  })
})
