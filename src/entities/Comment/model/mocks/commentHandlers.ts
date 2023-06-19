import { rest } from 'msw'
import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { mockComments } from './mockCommentEntities'

export const commentHandlers = [
  rest.get('/comments', (req, res, ctx) => {
    if (isMockLoading()) {
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
    }

    return res(ctx.status(200), ctx.json(mockComments))
  }),
]
