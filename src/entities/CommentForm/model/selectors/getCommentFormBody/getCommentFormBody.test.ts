import type { StateSchema } from 'app/providers/StoreProvider'
import { getCommentFormBody } from './getCommentFormBody'

describe('getCommentFormBody', () => {
  it('should return the body', () => {
    const state: DeepPartial<StateSchema> = {
      commentForm: {
        body: 'some comment',
      },
    }
    expect(
      getCommentFormBody(state as StateSchema)
    ).toEqual('some comment')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getCommentFormBody(state as StateSchema)
    ).toEqual('')
  })
})
