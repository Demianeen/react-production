import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import {
  counterReducer,
  counterSliceName,
} from 'entities/Counter'
import { userReducer, userSliceName } from 'entities/User'
import { $api } from 'shared/api/api'
import type { CombinedState, Reducer } from 'redux'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type {
  StateSchema,
  ThunkExtraArg,
} from './StateSchema'
import { createReducerManager } from './reducerManager'

interface CreateReduxStoreProps {
  preloadedState?: StateSchema
  preloadedAsyncReducers?: ReducersList
}

export function createReduxStore({
  preloadedState,
  preloadedAsyncReducers,
}: CreateReduxStoreProps) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...preloadedAsyncReducers,
    [counterSliceName]: counterReducer,
    [userSliceName]: userReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<
      CombinedState<StateSchema>
    >,
    devTools: __IS_DEV__,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  })

  // @ts-expect-error there is no such property in the store types definition
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<
  typeof createReduxStore
>['dispatch']
