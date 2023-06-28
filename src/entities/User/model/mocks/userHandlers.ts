import { isMockError } from '@/shared/lib/mock-server/isMockError'
import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { isStoryNameIncludes } from '@/shared/lib/mock-server/isStoryNameIncludes'
import { rest } from 'msw'
import { mockUser } from '../../testing'

export const articleRatingHandlers = [
  rest.get('/users/:id', (req, res, ctx) => {
    const { id } = req.params

    if (isMockLoading()) {
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
    }

    if (isStoryNameIncludes('Unauthorized') || isMockError()) {
      return res(ctx.status(500), ctx.json({}))
    }

    return res(
      ctx.status(200),
      ctx.json({ ...mockUser, id: Number(id) })
    )
  }),
]
