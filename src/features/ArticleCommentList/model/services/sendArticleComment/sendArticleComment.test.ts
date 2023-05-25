import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { sendArticleComment } from './sendArticleComment'

const state = {
  articleDetails: {
    data: {
      id: 1,
    },
  },
  user: {
    authData: {
      id: 1,
    },
  },
}

describe('sendArticleComment', () => {
  test('fulfilled', async () => {
    const thunk = new TestAsyncThunk(
      sendArticleComment,
      state
    )
    const newComment = {
      body: 'new comment body',
      id: 4,
    }
    thunk.api.post.mockReturnValue(
      Promise.resolve({
        data: newComment,
      })
    )
    const result = await thunk.call('new comment body')

    expect(result.payload).toEqual(newComment)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(
      sendArticleComment,
      state
    )
    thunk.api.post.mockReturnValue(
      Promise.resolve({
        status: 403,
      })
    )
    const result = await thunk.call('new comment body')

    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })

  test('no data', async () => {
    const thunk = new TestAsyncThunk(
      sendArticleComment,
      state
    )
    thunk.api.post.mockReturnValue(
      Promise.resolve({
        data: undefined,
      })
    )
    const result = await thunk.call('new comment body')

    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
