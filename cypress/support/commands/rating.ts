import type { Article } from '../../../src/entities/Article/model/types/article'

// we don't need to remove comment manually because it will be removed automatically with associated entity
export const setRating = (
  rating = 5,
  feedback = 'test feedback'
) => {
  cy.getByTestId(`StarRating.${rating}`).click()
  cy.getByTestId('RatingCard.FeedbackInput').type(feedback)
  cy.getByTestId('RatingCard.SubmitButton').click()
}

declare global {
  namespace Cypress {
    interface Chainable {
      setRating(
        rating: number,
        feedback?: string
      ): Chainable<Article>
    }
  }
}
