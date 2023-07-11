import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import type { StateSchema } from '@/app/providers/StoreProvider'
import type { AppDispatch } from '../../src/app/providers/StoreProvider/config/store'
import * as commonCommands from './commands/common'
import * as profileCommands from './commands/profile'
import * as articleCommands from './commands/article'
import * as commentCommands from './commands/comment'
import * as ratingCommands from './commands/rating'
import * as popupsCommands from './commands/popups'

Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(profileCommands)
Cypress.Commands.addAll(articleCommands)
Cypress.Commands.addAll(commentCommands)
Cypress.Commands.addAll(ratingCommands)
Cypress.Commands.addAll(popupsCommands)
// TODO: overwrite interceptor to create fixture from response

declare global {
  interface Window {
    store: ToolkitStore<StateSchema> & {
      dispatch: AppDispatch
    }
  }
}
