import { rest } from 'msw'
import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { isMockError } from '@/shared/lib/mock-server/isMockError'
import { isStoryNameIncludes } from '@/shared/lib/mock-server/isStoryNameIncludes'
import { mockProfileRating } from '@/features/ProfileRating/model/mocks/mockProfileRating'

export const profileRatingHandlers = [
  rest.get('/profile-rating', (req, res, ctx) => {
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

    if (isStoryNameIncludes('unrated')) {
      return res(ctx.status(200), ctx.json([]))
    }

    return res(
      ctx.status(200),
      ctx.json([mockProfileRating])
    )
  }),
  rest.post('/profile-rating', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProfileRating))
  }),
]
