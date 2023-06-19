import { rest } from 'msw'
import avatar from '@/shared/assets/mocks/avatar.jpeg'
import articleImage from '@/shared/assets/mocks/article.png'

export const imageHandlers = [
  // browser remembers the image and doesn't make a request second time
  rest.get('https://mockapi.com/*/loading', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
  }),

  rest.get('https://mockapi.com/avatar', async (req, res, ctx) => {
    const fetchRes = await fetch(avatar)
    const imageBuffer = await fetchRes.arrayBuffer()

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.body(imageBuffer)
    )
  }),

  rest.get(
    'https://mockapi.com/article-image',
    async (req, res, ctx) => {
      const imageBuffer = await fetch(articleImage).then((fetchRes) =>
        fetchRes.arrayBuffer()
      )

      return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'image/png'),
        ctx.body(imageBuffer)
      )
    }
  ),
]
