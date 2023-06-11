import type { Article } from '../../../src/entities/Article/model/types/article'

// we don't need to remove comment manually because it will be removed automatically with associated entity
export const addComment = (text = 'Test comment') => {
  cy.getByTestId('CommentForm.Input').type(text)
  cy.getByTestId('CommentForm.SubmitButton').click()
}

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text?: string): Chainable<Article>
    }
  }
}
