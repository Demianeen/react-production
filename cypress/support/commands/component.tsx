import type { ReactNode } from 'react'
import { Theme } from '../../../src/shared/const/theme'
import {
  TestProvider,
  type TestProviderOptions,
} from '../../../src/shared/lib/tests/componentRender/TestProvider'
import { TestStyleProvider } from '../../../src/shared/lib/tests/componentRender/TestStyleProvider'

export const mountComponent = (
  Component: ReactNode,
  options?: TestProviderOptions & {
    theme: Theme
  }
) => {
  return cy.mount(
    <TestStyleProvider theme={options?.theme ?? Theme.LIGHT}>
      <TestProvider options={options}>{Component}</TestProvider>
    </TestStyleProvider>
  )
}

declare global {
  namespace Cypress {
    interface Chainable {
      mountComponent(
        Component: ReactNode,
        options?: TestProviderOptions
      ): ReturnType<typeof mountComponent>
    }
  }
}
