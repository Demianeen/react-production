import type { Profile } from '../../../src/entities/Profile/model/types/profile'

interface ProfileEdit {
  newFirstName: string
  newLastName: string
}

export const updateProfile = ({
  newFirstName: firstName,
  newLastName: lastName,
}: ProfileEdit) => {
  cy.getByTestId(
    'EditableProfileCardHeader.EditButton'
  ).click()

  cy.getByTestId('ProfileCard.firstName').clear()
  cy.getByTestId('ProfileCard.firstName').type(firstName)

  cy.getByTestId('ProfileCard.lastName').clear()
  cy.getByTestId('ProfileCard.lastName').type(lastName)

  cy.getByTestId(
    'EditableProfileCardHeader.SaveButton'
  ).click()
}

export const resetProfile = (profileId: number) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: `mockAuth`,
    },
    body: {
      id: 4,
      firstName: 'Test',
      lastName: 'Testov',
      age: 465,
      currency: 'UAH',
      country: 'Ukraine',
      city: 'Kyiv',
      username: 'testUser',
    },
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(data: ProfileEdit): Chainable<void>
      resetProfile(profileId: number): Chainable<Profile>
    }
  }
}
