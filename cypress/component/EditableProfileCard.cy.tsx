import type { Profile } from '../../src/entities/Profile'
import { EditableProfileCard } from '../../src/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard'

let mockProfile: Profile = {}
describe('EditableProfileCard.cy.tsx', () => {
  describe('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
      cy.intercept('GET', '**/profile/*', {
        fixture: 'profile.json',
      })
      cy.fixture('profile.json').then((profile) => {
        mockProfile = profile
        cy.mountComponent(<EditableProfileCard id={profile.id} />, {
          preloadedState: {
            user: {
              authData: {
                id: profile.id,
              },
            },
          },
        })
      })
    })

    it('should toggle readonly mode', () => {
      cy.getByTestId('EditableProfileCardHeader.EditButton').click()

      cy.getByTestId('EditableProfileCardHeader.CancelButton').should(
        'be.visible'
      )
      cy.getByTestId('EditableProfileCardHeader.SubmitButton').should(
        'be.visible'
      )

      cy.getByTestId('EditableProfileCardHeader.CancelButton').click()
      cy.getByTestId('EditableProfileCardHeader.EditButton').should(
        'be.visible'
      )
    })

    it('should reset data after cancel', () => {
      const newFirstName = 'new test first name'
      const newLastName = 'new test last name'

      cy.updateProfile(
        {
          newFirstName,
          newLastName,
        },
        { submit: false }
      )

      cy.getByTestId('EditableProfileCardHeader.CancelButton').click()

      cy.getByTestId('ProfileCard.firstName').should(
        'have.value',
        mockProfile.firstName
      )
      cy.getByTestId('ProfileCard.lastName').should(
        'have.value',
        mockProfile.lastName
      )
    })

    it('should submit data', () => {
      const newFirstName = 'new test first name'
      const newLastName = 'new test last name'

      cy.intercept('PUT', '**/profile/*', {
        statusCode: 201,
        body: {
          ...mockProfile,
          firstName: newFirstName,
          lastName: newLastName,
        },
      })

      cy.updateProfile({
        newFirstName,
        newLastName,
      })

      cy.getByTestId('ProfileCard.firstName').should(
        'have.value',
        newFirstName
      )
      cy.getByTestId('ProfileCard.lastName').should(
        'have.value',
        newLastName
      )
    })

    it('should show validation errors', () => {
      cy.getByTestId('EditableProfileCardHeader.EditButton').click()

      cy.getByTestId('ProfileCard.firstName').clear()

      cy.getByTestId('EditableProfileCardHeader.SubmitButton').click()

      cy.getByTestId('EditableProfileCard.Error.Paragraph').should(
        'be.visible'
      )
    })
  })
})
