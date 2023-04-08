import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import {
  counterReducer,
  counterSliceName,
} from 'entities/Counter'
import { userReducer, userSliceName } from 'entities/User'
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { $api } from 'shared/api/api'
import type { NavigateFunction } from 'react-router/dist/lib/hooks'
import type {
  ReduxStoreWithReducerManager,
  StateSchema,
} from './StateSchema'

export const createReduxStore = (
  preloadedState?: StateSchema,
  preloadedAsyncReducers?: ReducersList,
  navigate?: NavigateFunction
) => {
  const staticReducers: ReducersMapObject<StateSchema> = {
    ...preloadedAsyncReducers,
    [counterSliceName]: counterReducer,
    [userSliceName]: userReducer,
  }

  const reducerManager =
    createReducerManager(staticReducers)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            navigate,
          },
        },
      }),
  })

  // @ts-expect-error there is no such property in the store types definition
  store.reducerManager = reducerManager

  return store as ReduxStoreWithReducerManager
}
