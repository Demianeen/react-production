import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import type { StateSchema } from './StateSchema'

export const createReduxStore = (
  preloadedState?: StateSchema
) =>
  configureStore<StateSchema>({
    reducer: {
      counter: counterReducer,
    },
    devTools: __IS_DEV__,
    preloadedState,
  })
