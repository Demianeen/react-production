import { rest } from 'msw'
import { isMockLoading } from '@/shared/lib/mock-server/isMockLoading'
import { isMockEmpty } from '@/shared/lib/mock-server/isMockEmpty'
import { isMockError } from '@/shared/lib/mock-server/isMockError'
import { mockNotifications } from './mockNotifications'

export const notificationHandlers = [
  rest.get('/notifications', (req, res, ctx) => {
    console.log('isMockLoading', isMockLoading())
    console.log('isMockError', isMockError())
    console.log('isMockEmpty', isMockEmpty())
    if (isMockLoading()) {
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
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
