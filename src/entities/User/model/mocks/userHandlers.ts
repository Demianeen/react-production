import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { rest } from 'msw'
import { isStoryNameIncludes } from '@/shared/lib/mock-server/isStoryNameIncludes'
import { mockUser } from './mockUser'

let patchedMockUser = mockUser

export const userHandlers = [
  rest.get('/users/:id', (req, res, ctx) => {
    const { id } = req.params

    if (isMockLoading()) {
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
    }

    if (isStoryNameIncludes('unauthorized')) {
      return res(ctx.status(500), ctx.json({}))
    }

    return res(
      ctx.status(200),
      ctx.json({ ...patchedMockUser, id: Number(id) })
    )
  }),
  rest.patch('/users/:id', async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json()

    if (isMockLoading()) {
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
    }

    if (isStoryNameIncludes('unauthorized')) {
      return res(ctx.status(500), ctx.json({}))
    }

    patchedMockUser = { ...patchedMockUser, id: Number(id), ...body }

    return res(ctx.status(200), ctx.json(patchedMockUser))
  }),
]
