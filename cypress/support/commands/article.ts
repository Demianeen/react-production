import type { Article } from '../../../src/entities/Article/model/types/article'

const defaultArticle = {
  title: 'Test title',
  subtitle: 'Test subtitle',
  img: 'https://blog.jetbrains.com/wp-content/uploads/2023/03/DSGN-16128-1.8.20-Release_Blog-Featured-image-1280x600-1.png',
  views: 1022,
  userId: 1,
  createdAt: '26.02.2013',
  types: ['IT'],
  blocks: [
    {
      id: 1,
      type: 'TEXT',
      title: 'Test title',
      paragraphs: [
        'Test paragraph 1',
        'Test paragraph 2',
        'Test paragraph 3',
      ],
    },
  ],
}

export const createArticle = (article?: Omit<Article, 'id'>) =>
  cy
    .request({
      method: 'POST',
      url: `http://localhost:8000/articles`,
      headers: {
        Authorization: `mockAuth`,
      },
      body: article ?? defaultArticle,
    })
    .then((response) => response.body)

export const removeArticle = (articleId: number) =>
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'mockAuth' },
  })

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>
      removeArticle(articleId: number): Chainable<void>
    }
  }
}
