import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { mockArticle } from '../../mocks/mockArticle'
import { fetchArticleById } from './fetchArticleById'

describe('fetchArticleById', () => {
  test('fulfilled', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById)
    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: mockArticle })
    )
    const result = await thunk.call(1)

    expect(result.payload).toEqual(mockArticle)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById)
    thunk.api.get.mockReturnValue(
      Promise.resolve({ status: 403 })
    )
    const result = await thunk.call(1)

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })

  test('no data', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById)
    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: undefined })
    )
    const result = await thunk.call(1)

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
