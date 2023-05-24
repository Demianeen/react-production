import { rest } from 'msw'
import { isMockLoading } from 'shared/lib/mock-server/isMockLoading'
import { mockArticle } from './data'
import type { Article } from '../types/article'

export const articleHandlers = [
  rest.get('/articles', (req, res, ctx) => {
    const { searchParams } = req.url
    const limit = searchParams.get('_limit')
    const page = searchParams.get('_page')

    if (isMockLoading()) {
      return res(
        ctx.status(200),
        ctx.json({}),
        ctx.delay('infinite')
      )
    }

    const articles: Article[] = Array.from({
      length: Number(limit),
    }).map((_, index) => ({
      ...mockArticle,
      id: Number(page) + index,
    }))

    return res(ctx.status(200), ctx.json(articles))
  }),
]
