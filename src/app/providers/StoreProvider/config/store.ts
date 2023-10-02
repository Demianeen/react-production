import { configureStore } from '@reduxjs/toolkit'
import type { CombinedState, Reducer } from 'redux'
import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { $api } from '@/shared/api/api'
import { pageReducer } from '@/widgets/Page'
import { rtkApi } from '@/shared/api/rtkApi'
import type {
  AsyncReducersList,
  ReducersList,
  StateSchema,
  StateSchemaKey,
  ThunkExtraArg,
} from './stateSchema'
import { createReducerManager } from './reducerManager'

interface CreateReduxStoreProps {
  preloadedState?: StateSchema
  preloadedAsyncReducers?: AsyncReducersList
}

export const createReduxStore = ({
  preloadedState,
  preloadedAsyncReducers,
}: CreateReduxStoreProps) => {
  const rootReducers: ReducersList = {
    ...preloadedAsyncReducers,
    counter: counterReducer,
    user: userReducer,
    page: pageReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
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
      }).concat(rtkApi.middleware),
  })

  // @ts-expect-error there is no such property in the store const definition
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<
  typeof createReduxStore
>['dispatch']
