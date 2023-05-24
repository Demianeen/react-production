import { rest } from 'msw'
import { isMockLoading } from 'shared/lib/mock-server/isMockLoading'
import { isMockError } from 'shared/lib/mock-server/isMockError'
import { mockArticle } from './data'

export const articleDetailsHandlers = [
  rest.get('/articles/:articleId', (req, res, ctx) => {
    if (isMockLoading()) {
      return res(
        ctx.status(200),
        ctx.json({}),
        ctx.delay('infinite')
      )
    }

    if (isMockError()) {
      return res(ctx.status(500), ctx.json({}))
    }

    return res(ctx.status(200), ctx.json(mockArticle))
  }),
]
