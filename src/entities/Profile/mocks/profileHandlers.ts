import { rest } from 'msw'
import { isMockLoading } from 'shared/lib/mock-server/isMockLoading'
import { mockProfile } from './data'

export const profileHandlers = [
  rest.get('/profile/:profileId', (req, res, ctx) => {
    const { profileId = '1' } = req.params

    if (isMockLoading()) {
      return res(
        ctx.status(200),
        ctx.json({}),
        ctx.delay('infinite')
      )
    }

    return res(
      ctx.status(200),
      ctx.json({ ...mockProfile, id: Number(profileId) })
    )
  }),

  rest.put('/profile/:profileId', async (req, res, ctx) => {
    const updatedProfile = await req.json()

    return res(ctx.status(200), ctx.json(updatedProfile))
  }),
]
