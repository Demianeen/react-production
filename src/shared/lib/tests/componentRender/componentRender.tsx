import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from 'shared/config/i18n/i18nForTests'
import type { StateSchema } from 'app/providers/StoreProvider'
import { StoreProvider } from 'app/providers/StoreProvider'

import userEvent from '@testing-library/user-event'

export interface ComponentRenderOptions {
  route?: string
  preloadedState?: DeepPartial<StateSchema>
}

export const componentRender = (
  Component: ReactNode,
  {
    route = '/',
    preloadedState,
  }: ComponentRenderOptions = {}
) => {
  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <StoreProvider preloadedState={preloadedState}>
          <I18nextProvider i18n={i18nForTests}>
            {Component}
          </I18nextProvider>
        </StoreProvider>
      </MemoryRouter>
    ),
  }
}
