export const rtkApiTemplate = (
  apiName: string
) => `import { rtkApi } from '@/shared/api/rtkApi'

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
