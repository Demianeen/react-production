import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from 'shared/config/i18n/i18nForTests'
import type { StateSchema } from 'app/providers/StoreProvider'
import { StoreProvider } from 'app/providers/StoreProvider'
import type { DeepPartial } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'

export interface IComponentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

export const componentRender = (
  Component: ReactNode,
  {
    route = '/',
    initialState,
  }: IComponentRenderOptions = {}
) => {
  return {
    user: userEvent.setup(),
    ...render(
      <StoreProvider initialState={initialState}>
        <MemoryRouter initialEntries={[route]}>
          <I18nextProvider i18n={i18nForTests}>
            {Component}
          </I18nextProvider>
        </MemoryRouter>
      </StoreProvider>
    ),
  }
}
