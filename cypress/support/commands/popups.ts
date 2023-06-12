export const selectFromSelect = (
  testId: string,
  value: string
) => {
  cy.getByTestId(`${testId}.Button`).click()
  cy.getByTestId(`${testId}.Option.${value}`).click()
}

declare global {
  namespace Cypress {
    interface Chainable {
      selectFromSelect(
        testId: string,
        value: string
      ): Chainable<void>
    }
  }
}
