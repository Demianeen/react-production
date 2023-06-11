import { routes } from '../../../src/shared/lib/router/routes'

describe('Router', () => {
  describe('when user is not logged in', () => {
    it('opens home page', () => {
      cy.visit(routes.home())
      cy.getByTestId('HomePage').should('exist')
    })

    it('redirects to home page when going to /profile', () => {
      cy.visit(routes.profile({ id: '1' }))
      cy.getByTestId('HomePage').should('exist')
    })

    it('redirects to not found page', () => {
      cy.visit('/asfassdasfas')
      cy.getByTestId('NotFoundPage').should('exist')
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      cy.login('admin', '123')
    })

    it('opens profile page', () => {
      cy.visit(routes.profile({ id: '1' }))
      cy.getByTestId('ProfilePage').should('exist')
    })

    it('opens articles page', () => {
      cy.visit(routes.articles())
      cy.getByTestId('ArticlesPage').should('exist')
    })
  })
})
