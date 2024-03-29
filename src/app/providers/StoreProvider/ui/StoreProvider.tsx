import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { createReduxStore } from '@/app/providers/StoreProvider/config/store'
import type {
  AsyncReducersList,
  StateSchema,
} from '@/app/providers/StoreProvider/config/stateSchema'

interface StoreProviderProps {
  children: ReactNode
  preloadedState?: DeepPartial<StateSchema>
  preloadedAsyncReducers?: AsyncReducersList
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

  // @ts-expect-error expose store when run in Cypress
  if (window.Cypress) {
    // @ts-expect-error store type for window is added only for Cypress
    window.store = store
  }

  return <Provider store={store}>{children}</Provider>
}
