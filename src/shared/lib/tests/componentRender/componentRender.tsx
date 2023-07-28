import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { TestProviderOptions } from './TestProvider'
import { TestProvider } from './TestProvider'

export type ComponentRenderReturn = ReturnType<typeof componentRender>

export const componentRender = (
  Component: ReactNode,
  options: TestProviderOptions = {}
) => {
  return {
    user: userEvent.setup(),
    ...render(
      <TestProvider options={options}>{Component}</TestProvider>
    ),
  }
}
