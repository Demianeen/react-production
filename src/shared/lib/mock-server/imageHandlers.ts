import { rest } from 'msw'
import avatar from 'shared/assets/mocks/avatar.jpeg'

export const imageHandlers = [
  rest.get(
    'https://mockapi.com/avatar',
    async (req, res, ctx) => {
      const imageBuffer = await fetch(avatar).then(
        (fetchRes) => fetchRes.arrayBuffer()
      )

      return res(
        ctx.set(
          'Content-Length',
          imageBuffer.byteLength.toString()
        ),
        ctx.set('Content-Type', 'image/jpeg'),
        ctx.body(imageBuffer)
      )
    }
  ),
]
