import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { StateSchema } from '@/app/providers/StoreProvider'
import type { ReducersList } from '../../hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { TestProvider } from './TestProvider'

export interface ComponentRenderOptions {
  route?: string
  preloadedState?: DeepPartial<StateSchema>
  asyncReducers?: ReducersList
}

export const componentRender = (
  Component: ReactNode,
  options: ComponentRenderOptions = {}
) => {
  return {
    user: userEvent.setup(),
    ...render(
      <TestProvider options={options}>
        {Component}
      </TestProvider>
    ),
  }
}
