import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { comments } from 'features/ArticleCommentList/model/mocks/data'
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'

describe('fetchCommentsByArticleId.test', () => {
  test('fulfilled', async () => {
    const thunk = new TestAsyncThunk(
      fetchCommentsByArticleId
    )
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        data: comments,
      })
    )
    const result = await thunk.call(1)

    expect(result.payload).toEqual(comments)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(
      fetchCommentsByArticleId
    )
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
    const thunk = new TestAsyncThunk(
      fetchCommentsByArticleId
    )
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
