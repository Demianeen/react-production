import { routes } from '../../../src/shared/lib/router/routes'

let articleId = 0
describe('User enters article details page', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((data) => {
      articleId = data.id
      cy.visit(
        routes.articleDetails({ id: String(articleId) })
      )
    })
  })

  afterEach(() => {
    cy.log('articleId', articleId)
    cy.removeArticle(articleId)
  })

  it('renders article', () => {
    // cy.getByTestId('ArticleDetails.logo').should(
    //   'have.attr',
    //   'src',
    //   defaultArticle.img
    // )
    // cy.getByTestId('ArticleDetails.Title').should(
    //   'have.text',
    //   defaultArticle.title
    // )
    // cy.getByTestId('ArticleDetails.Paragraph').should(
    //   'have.text',
    //   defaultArticle.subtitle
    // )
    // cy.getByTestId('ArticleDetails.views.Paragraph').should(
    //   'have.text',
    //   String(defaultArticle.views)
    // )
    // cy.getByTestId(
    //   'ArticleDetails.createdAt.Paragraph'
    // ).should('have.text', defaultArticle.createdAt)
    // cy.getByTestId('ArticleDetails.TextBlock.Title').should(
    //   'have.text',
    //   defaultArticle.blocks[0].title
    // )
    // cy.getByTestId(
    //   'ArticleDetails.TextBlock.Paragraph'
    // ).should(
    //   'have.text',
    //   defaultArticle.blocks[0].paragraphs.join('')
    // )
  })

  it('rates article', () => {
    cy.getByTestId('ArticleDetails.logo')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.get('[data-selected=true]').should('have.length', 0)
    cy.setRating(4, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 4)
  })

  it('renders article recommendations', () => {
    cy.getByTestId(
      'ArticleRecommendationsList'
    ).scrollIntoView()
    cy.getByTestId(
      'ArticleRecommendationsList.Item.Grid'
    ).should('have.length', 4)
  })

  it('adds comment', () => {
    cy.getByTestId('ArticleDetails.logo')
    cy.getByTestId('CommentList').scrollIntoView()
    cy.getByTestId('CommentList.Item').should(
      'have.length',
      0
    )
    cy.getByTestId(
      'CommentList.NoComments.Paragraph'
    ).should('exist')

    cy.addComment()
    cy.getByTestId('CommentList.Item').should(
      'have.length',
      1
    )
    cy.getByTestId(
      'CommentList.NoComments.Paragraph'
    ).should('not.exist')
  })
})
