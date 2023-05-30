import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { mockArticles } from '@/entities/Article/testing'
import { fetchArticles } from './fetchArticles'

describe('fetchArticles', () => {
  test('fulfilled', async () => {
    const thunk = new TestAsyncThunk(fetchArticles, {
      articleInfiniteList: {
        page: 1,
      },
    })
    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: mockArticles })
    )
    const result = await thunk.call()

    expect(result.payload).toEqual(mockArticles)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(fetchArticles, {
      articleInfiniteList: {
        page: 1,
      },
    })
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        status: 403,
      })
    )
    const result = await thunk.call()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })

  test('no data', async () => {
    const thunk = new TestAsyncThunk(fetchArticles, {
      articleInfiniteList: {
        page: 1,
      },
    })
    thunk.api.get.mockReturnValue(
      Promise.resolve({
        data: undefined,
      })
    )
    const result = await thunk.call()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
