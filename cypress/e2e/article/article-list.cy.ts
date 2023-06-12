import { SortOrder } from '../../../src/shared/const/sort'
import { SortField } from '../../../src/entities/ListFilters/model/const/sortField'
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

  it('user changes sort field to "views"', () => {
    cy.intercept('GET', '**/articles@(\\?)**').as(
      'getArticles'
    )

    cy.getByTestId('ArticleListItem.Grid').should(
      'have.length.greaterThan',
      3
    )
    cy.selectFromSelect(
      'ListFiltersSortField',
      SortField.VIEWS
    )

    // Wait for new articles to be returned by the server
    cy.wait('@getArticles')
    cy.wait('@getArticles')

    // should have ascending amount of views
    let previousViewsAmount = 0
    cy.getByTestId('ArticleListItem.Views.Paragraph').each(
      (views) => {
        const viewsAmounts = Number(views.text())
        cy.wrap(viewsAmounts).should(
          'be.gte',
          previousViewsAmount
        )
        previousViewsAmount = viewsAmounts
      }
    )
  })

  it('user changes sort order to "desc"', () => {
    cy.intercept('GET', '**/articles@(\\?)**').as(
      'getArticles'
    )

    cy.getByTestId('ArticleListItem.Grid').should(
      'have.length.greaterThan',
      3
    )
    cy.selectFromSelect('ListFiltersOrder', SortOrder.DESC)
    cy.selectFromSelect(
      'ListFiltersSortField',
      SortField.VIEWS
    )

    // Wait for new articles to be returned by the server
    cy.wait('@getArticles')
    cy.wait('@getArticles')
    cy.wait('@getArticles')

    // should have descending amount of views
    let previousViewsAmount = Infinity
    cy.getByTestId('ArticleListItem.Views.Paragraph').each(
      (views) => {
        const viewsAmounts = Number(views.text())
        cy.log('viewsAmounts', views)
        cy.wrap(viewsAmounts).should(
          'be.lte',
          previousViewsAmount
        )
        previousViewsAmount = viewsAmounts
      }
    )
  })

  it.skip('skipped test example', () => {
    cy.getByTestId('adsafafafdsa').should('exist')
  })
})