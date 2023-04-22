import type { StateSchema } from 'app/providers/StoreProvider'
import { getAddCommentFormBody } from './getAddCommentFormBody'

describe('getAddCommentFormBody', () => {
  it('should return the body', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        body: 'some comment',
      },
    }
    expect(
      getAddCommentFormBody(state as StateSchema)
    ).toEqual('some comment')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getAddCommentFormBody(state as StateSchema)
    ).toEqual('')
  })
})
