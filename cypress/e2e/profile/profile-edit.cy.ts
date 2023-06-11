import { routes } from '../../../src/shared/lib/router/routes'

let profileId = 0
describe('User enters profile page', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit(routes.profile({ id: String(profileId) }))
    })
  })

  afterEach(() => {
    cy.resetProfile(profileId)
  })

  it('page renders', () => {
    cy.getByTestId('ProfileCard.firstName').should(
      'have.value',
      'Test'
    )
    cy.getByTestId('ProfileCard.lastName').should(
      'have.value',
      'Testov'
    )
    cy.getByTestId('ProfileCard.age').should(
      'have.value',
      '465'
    )
    cy.getByTestId('ProfileCard.username').should(
      'have.value',
      'testUser'
    )
  })

  it('user edits it', () => {
    const newFirstName = 'NewFirstName'
    const newLastName = 'NewLastName'
    cy.updateProfile({ newFirstName, newLastName })

    cy.getByTestId('ProfileCard.firstName').should(
      'have.value',
      newFirstName
    )
    cy.getByTestId('ProfileCard.lastName').should(
      'have.value',
      newLastName
    )
  })
})
