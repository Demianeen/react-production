export const rtkApiTemplate = (apiName: string) => {
  return `import { rtkApi } from 'shared/api/rtkApi'
import type { Article } from 'entities/Article'

const ${apiName}Api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query<
      ,
      number
    >({
      query: (limit) => ({
        url: '/',
        params: {
        },
      }),
    }),
   
  }),
})

export const { } =
  ${apiName}Api
`
}
