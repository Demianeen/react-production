import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { $api } from 'shared/api/api'
import type { CombinedState, Reducer } from 'redux'
import { pageReducer } from 'widgets/Page'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type {
  StateSchema,
  StateSchemaKey,
  ThunkExtraArg,
} from './stateSchema'
import { createReducerManager } from './reducerManager'

interface CreateReduxStoreProps {
  preloadedState?: StateSchema
  preloadedAsyncReducers?: Record<StateSchemaKey, Reducer>
}

export function createReduxStore({
  preloadedState,
  preloadedAsyncReducers,
}: CreateReduxStoreProps) {
  const rootReducers: ReducersList = {
    ...preloadedAsyncReducers,
    counter: counterReducer,
    user: userReducer,
    page: pageReducer,
  }

  const reducerManager = createReducerManager(
    rootReducers as Record<StateSchemaKey, Reducer>
  )

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
