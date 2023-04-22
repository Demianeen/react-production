import type { StateSchema } from 'app/providers/StoreProvider'
import { getAddCommentFormError } from './getAddCommentFormError'

describe('getAddCommentFormError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        error: 'error',
      },
    }
    expect(
      getAddCommentFormError(state as StateSchema)
    ).toEqual('error')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getAddCommentFormError(state as StateSchema)
    ).toEqual(undefined)
  })
})
