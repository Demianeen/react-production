import { SortField } from '../../../src/entities/ListFilters'
import { routes } from '../../../src/shared/lib/router/routes'

describe('User enters the articles page', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(routes.articles())
  })

  it('articles renders successfully', () => {
    cy.getByTestId('VirtualizedArticleList.Grid').should(
      'exist'
    )
    cy.getByTestId('ArticleListItem.Grid').should(
      'have.length.greaterThan',
      3
    )
  })

  it('user searches for an article', () => {
    const searchQuery = 'economics'
    cy.getByTestId('Search').type(searchQuery)
    cy.getByTestId('ArticleListItem.Grid').should(
      'have.length',
      1
    )
  })

  it('user changes sort field to "views', () => {
    cy.getByTestId('ListFiltersSortField').select(
      SortField.VIEWS
    )
    cy.getByTestId('ArticleListItem.Grid').should(
      'have.length.greaterThan',
      3
    )
  })
})
