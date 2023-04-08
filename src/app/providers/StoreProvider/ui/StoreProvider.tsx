import { Provider } from 'react-redux'
import { createReduxStore } from 'app/providers/StoreProvider/config/store'
import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import type { ReactNode } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useNavigate } from 'react-router-dom'

interface StoreProviderProps {
  children: ReactNode
  preloadedState?: DeepPartial<StateSchema>
  preloadedAsyncReducers?: ReducersList
}

export const StoreProvider = ({
  children,
  preloadedState,
  preloadedAsyncReducers,
}: StoreProviderProps) => {
  const navigate = useNavigate()

  const store = createReduxStore({
    preloadedState: preloadedState as StateSchema,
    preloadedAsyncReducers,
    navigate,
  })

  return <Provider store={store}>{children}</Provider>
}
