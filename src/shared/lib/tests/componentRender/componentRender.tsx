import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { TestProviderOptions } from './TestProvider'
import { TestProvider } from './TestProvider'

export type ComponentRenderReturn = ReturnType<typeof componentRender>

/**
 * Used to render the component with all the providers required for the component to work.
 *
 * Also setup userEvent and return it.
 * @param Component - component to render
 * @param options - TestProvider options
 * @returns {ComponentRenderReturn}
 */
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
