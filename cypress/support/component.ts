import './commands'
import { mount } from 'cypress/react18'
import * as componentCommands from './commands/component'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
Cypress.Commands.addAll(componentCommands)
