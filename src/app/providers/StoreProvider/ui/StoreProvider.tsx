import { Provider } from 'react-redux'
import { createReduxStore } from 'app/providers/StoreProvider/config/store'
import type {
  StateSchema,
  StateSchemaKey,
} from 'app/providers/StoreProvider/config/stateSchema'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import type { Reducer } from 'redux'

interface StoreProviderProps {
  children: ReactNode
  preloadedState?: DeepPartial<StateSchema>
  preloadedAsyncReducers?: Record<StateSchemaKey, Reducer>
}

export const StoreProvider = ({
  children,
  preloadedState,
  preloadedAsyncReducers,
}: StoreProviderProps) => {
  const store = useMemo(
    () =>
      createReduxStore({
        preloadedState: preloadedState as StateSchema,
        preloadedAsyncReducers,
      }),
    [preloadedAsyncReducers, preloadedState]
  )

  return <Provider store={store}>{children}</Provider>
}
