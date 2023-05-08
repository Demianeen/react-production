import type { AddCommentFormSchema } from '../types/addCommentFormSchema'
import {
  addCommentFormActions,
  addCommentFormReducer,
} from './addCommentFormSlice'

describe('addCommentFormSlice', () => {
  test('setBody', () => {
    const state: DeepPartial<AddCommentFormSchema> = {
      body: 'body',
    }
    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setBody('new body')
      )
    ).toEqual({ body: 'new body' })
  })
})
