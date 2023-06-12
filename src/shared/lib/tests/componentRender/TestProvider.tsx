import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
  StoreProvider,
  type StateSchema,
} from '@/app/providers/StoreProvider'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
import type { ReducersList } from '../../hooks/useDynamicModuleLoader/useDynamicModuleLoader'

export interface TestProviderOptions {
  route?: string
  preloadedState?: DeepPartial<StateSchema>
  asyncReducers?: ReducersList
}

interface TestProviderProps {
  children: ReactNode
  options?: TestProviderOptions
}

export const TestProvider = ({
  children,
  options: {
    preloadedState,
    asyncReducers = {},
    route = '/',
  } = {},
}: TestProviderProps) => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        preloadedAsyncReducers={asyncReducers}
        preloadedState={preloadedState}
      >
        <I18nextProvider i18n={i18nForTests}>
          {children}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}