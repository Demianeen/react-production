import type { AddCommentFormSchema } from 'features/AddCommentForm'
import {
  addCommentFormActions,
  addCommentFormReducer,
} from 'features/AddCommentForm/model/slice/addCommentFormSlice'

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
