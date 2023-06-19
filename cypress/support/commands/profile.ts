import type { Profile } from '../../../src/entities/Profile/model/types/profile'

interface ProfileEdit {
  newFirstName: string
  newLastName: string
}

interface ProfileEditOptions {
  submit?: boolean
}

export const updateProfile = (
  { newFirstName: firstName, newLastName: lastName }: ProfileEdit,
  { submit = true }: ProfileEditOptions = {}
) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click()

  cy.getByTestId('ProfileCard.firstName').clear()
  cy.getByTestId('ProfileCard.firstName').type(firstName)

  cy.getByTestId('ProfileCard.lastName').clear()
  cy.getByTestId('ProfileCard.lastName').type(lastName)

  if (submit) {
    cy.getByTestId('EditableProfileCardHeader.SubmitButton').click()
  }
}

export const resetProfile = (profileId: number) => {
  return cy.fixture('profile.json').then((profile) =>
    cy.request({
      method: 'PUT',
      url: `http://localhost:8000/profile/${profileId}`,
      headers: {
        Authorization: `mockAuth`,
      },
      body: profile,
    })
  )
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(
        data: ProfileEdit,
        options?: ProfileEditOptions
      ): Chainable<void>
      resetProfile(profileId: number): Chainable<Profile>
    }
  }
}
