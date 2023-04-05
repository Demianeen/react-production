import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import {
  counterReducer,
  counterSliceName,
} from 'entities/Counter'
import { userReducer, userSliceName } from 'entities/User'
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager'
import type { ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import type {
  ReduxStoreWithReducerManager,
  StateSchema,
} from './StateSchema'

export const createReduxStore = (
  preloadedState?: StateSchema,
  asyncReducers?: ReducersList
) => {
  const staticReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    [counterSliceName]: counterReducer,
    [userSliceName]: userReducer,
  }

  const reducerManager =
    createReducerManager(staticReducers)

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState,
  })

  // @ts-expect-error we will create type for this later
  store.reducerManager = reducerManager

  return store as ReduxStoreWithReducerManager
}
