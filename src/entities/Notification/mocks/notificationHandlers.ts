import { rest } from 'msw'
import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { mockNotifications } from '@/entities/Notification/mocks/notificationMockData'
import { isMockEmpty } from '@/shared/lib/mock-server/isMockEmpty'
import { isMockError } from '@/shared/lib/mock-server/isMockError'

export const notificationHandlers = [
  rest.get('/notifications', (req, res, ctx) => {
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

    if (isMockEmpty()) {
      return res(ctx.status(200), ctx.json([]))
    }

    return res(ctx.status(200), ctx.json(mockNotifications))
  }),
]
