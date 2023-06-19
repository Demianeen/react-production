import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { mockComments } from '@/entities/Comment/testing'
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'

describe('fetchCommentsByArticleId.test', () => {
  test('fulfilled', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        data: mockComments,
      })
    )
    const result = await thunk.call(1)

    expect(result.payload).toEqual(mockComments)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        status: 403,
      })
    )
    const result = await thunk.call(1)

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })

  test('no data', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        data: undefined,
      })
    )
    const result = await thunk.call(1)

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
