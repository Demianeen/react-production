import { rest } from 'msw'

export const imageHandlers = [
  // browser remembers the image and doesn't make a request second time
  rest.get('https://mockapi.com/*/loading', async (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
  ),
]
