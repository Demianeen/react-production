import type { StateSchema } from '@/app/providers/StoreProvider'
import { getCommentFormError } from './getCommentFormError'

describe('getCommentFormError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      commentForm: {
        error: 'error',
      },
    }
    expect(getCommentFormError(state as StateSchema)).toEqual('error')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getCommentFormError(state as StateSchema)).toEqual(
      undefined
    )
  })
})
