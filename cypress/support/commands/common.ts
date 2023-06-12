import { selectByTestId } from '../../helpers/selectByTestId'
import type { User } from '../../../src/entities/User/model/types/userSchema'
import { AUTH_DATA_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'

export const login = (
  username = 'testUser',
  password = '123'
) => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/login',
      body: {
        username,
        password,
      },
    })
    .then((response) => {
      window.localStorage.setItem(
        AUTH_DATA_LOCALSTORAGE_KEY,
        JSON.stringify(response.body)
      )

      return response.body
    })
}

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId))
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(
        username?: string,
        password?: string
      ): Chainable<User>
      getByTestId(
        testId: string
      ): ReturnType<typeof getByTestId>
    }
  }
}
