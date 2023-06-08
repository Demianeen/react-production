import { AUTH_DATA_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'

export const login = (
  username = 'testUser',
  password = '123'
) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password,
    },
  }).then((response) => {
    window.localStorage.setItem(
      AUTH_DATA_LOCALSTORAGE_KEY,
      JSON.stringify(response.body)
    )

    cy.visit('/')
  })
}
