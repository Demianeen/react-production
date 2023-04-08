import { Provider } from 'react-redux'
import { createReduxStore } from 'app/providers/StoreProvider/config/store'
import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import type { ReactNode } from 'react'
import type { DeepPartial } from '@reduxjs/toolkit'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useNavigate } from 'react-router-dom'

interface StoreProviderProps {
  children: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: ReducersList
}

export const StoreProvider = ({
  children,
  initialState,
  asyncReducers,
}: StoreProviderProps) => {
  const navigate = useNavigate()

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers,
    navigate
  )

  return <Provider store={store}>{children}</Provider>
}
