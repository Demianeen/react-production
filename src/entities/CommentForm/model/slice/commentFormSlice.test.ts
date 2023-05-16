import type { CommentFormSchema } from '../types/commentFormSchema'
import {
  commentFormActions,
  commentFormReducer,
} from './commentFormSlice'

describe('commentFormSlice', () => {
  test('setBody', () => {
    const state: DeepPartial<CommentFormSchema> = {
      body: 'body',
    }
    expect(
      commentFormReducer(
        state as CommentFormSchema,
        commentFormActions.setBody('new body')
      )
    ).toEqual({ body: 'new body' })
  })
})
