import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { rest } from 'msw'
import { isMockError } from '@/shared/lib/mock-server/isMockError'
import { isStoryNameIncludes } from '@/shared/lib/mock-server/isStoryNameIncludes'
import { mockUser } from './mockUser'

export const userHandlers = [
  rest.get('/users/:id', (req, res, ctx) => {
    const { id } = req.params

    if (isMockLoading()) {
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
    }

    if (isStoryNameIncludes('unauthorized') || isMockError()) {
      return res(ctx.status(500), ctx.json({}))
    }

    return res(
      ctx.status(200),
      ctx.json({ ...mockUser, id: Number(id) })
    )
  }),
]
