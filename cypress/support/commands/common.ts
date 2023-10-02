import { selectByTestId } from '../../helpers/selectByTestId'
import type { User } from '../../../src/entities/User/model/types/userSchema'
import { USER_ID_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'

export const login = (username = 'testUser', password = '123') =>
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/login',
      body: {
        username,
        password,
      },
    })
    .then((response) => {
      localStorage.setItem(USER_ID_LOCALSTORAGE_KEY, response.body.id)
      cy.wrap(response.body)
    })

export const getByTestId = (testId: string) =>
  cy.get(selectByTestId(testId))

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>
      getByTestId(testId: string): ReturnType<typeof getByTestId>
    }
  }
}
