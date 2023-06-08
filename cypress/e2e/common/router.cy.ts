import { selectByTestId } from 'cypress/helpers/selectByTestId'
import { routes } from '../../../src/shared/lib/router/routes'

describe('template spec', () => {
  describe('when user is not logged in', () => {
    it('should open home page', () => {
      cy.visit(routes.home())
      cy.get(selectByTestId('HomePage')).should('exist')
    })

    it('should redirect to home page when going to /profile', () => {
      cy.visit(routes.profile({ id: '1' }))
      cy.get(selectByTestId('HomePage')).should('exist')
    })

    it('should redirect to not found page', () => {
      cy.visit('/asfassdasfas')
      cy.get(selectByTestId('NotFoundPage')).should('exist')
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      cy.login('admin', '123')
    })

    it('should open profile page', () => {
      cy.visit(routes.profile({ id: '1' }))
      cy.get(selectByTestId('ProfilePage')).should('exist')
    })

    it('should open articles page', () => {
      cy.visit(routes.articles())
      cy.get(selectByTestId('ArticlesPage')).should('exist')
    })
  })
})
