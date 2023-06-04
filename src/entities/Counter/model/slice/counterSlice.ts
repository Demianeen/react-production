import type { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/ui/store'
import type { CounterSchema } from '../types/counterSchema'

const initialState: CounterSchema = {
  value: 0,
}

export const counterSlice = buildSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (
      state,
      action: PayloadAction<number>
    ) => {
      state.value += action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const {
  actions: counterActions,
  reducer: counterReducer,
  useActions: useCounterActions,
} = counterSlice
