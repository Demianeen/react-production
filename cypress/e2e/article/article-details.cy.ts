import { routes } from '../../../src/shared/lib/router/routes'

let articleId = 0
describe('User enters article details page', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((data) => {
      articleId = data.id
      cy.visit(routes.articleDetails({ id: String(articleId) }))
    })
  })

  afterEach(() => {
    cy.removeArticle(articleId)
  })

  it('renders article', () => {
    cy.getByTestId('ArticleDetails.logo').should(
      'have.attr',
      'src',
      'https://blog.jetbrains.com/wp-content/uploads/2023/03/DSGN-16128-1.8.20-Release_Blog-Featured-image-1280x600-1.png'
    )
    cy.getByTestId('ArticleDetails.Title').should(
      'have.text',
      'Test title'
    )
    cy.getByTestId('ArticleDetails.Subtitle').should(
      'have.text',
      'Test subtitle'
    )
    cy.getByTestId('ArticleAdditionalInfo.Views').should(
      'have.text',
      '1022 views'
    )
    cy.getByTestId('ArticleAdditionalInfo.CreatedAt').should(
      'have.text',
      '26.02.2013'
    )
    cy.getByTestId('ArticleDetails.TextBlock.Title').should(
      'have.text',
      'Test title'
    )
    cy.getByTestId('ArticleDetails.TextBlock.Paragraph').should(
      'have.text',
      [
        'Test paragraph 1',
        'Test paragraph 2',
        'Test paragraph 3',
      ].join('')
    )
  })

  it('rates article', () => {
    cy.intercept('GET', '**/articles/*', {
      fixture: 'article-details.json',
    })
    cy.getByTestId('ArticleDetails.logo')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.get('[data-selected=true]').should('have.length', 0)
    cy.setRating(4, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 4)
  })

  it('renders article recommendations', () => {
    cy.getByTestId('ArticleRecommendationsList').scrollIntoView()
    cy.getByTestId('ArticleRecommendationsList.Item.Grid').should(
      'have.length',
      4
    )
  })

  it('adds comment', () => {
    cy.intercept('GET', '**/articles/*', {
      fixture: 'article-details.json',
    })
    cy.getByTestId('ArticleDetails.logo')
    cy.getByTestId('CommentList').scrollIntoView()
    cy.getByTestId('CommentList.Item').should('have.length', 0)
    cy.getByTestId('CommentList.NoComments').should('exist')

    cy.addComment()
    cy.getByTestId('CommentList.Item').should('have.length', 1)
    cy.getByTestId('CommentList.NoComments').should('not.exist')
  })
})
