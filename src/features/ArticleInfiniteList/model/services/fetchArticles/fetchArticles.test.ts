import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticles } from './fetchArticles'
import { articles } from '../../mocks/data'

describe('fetchArticles', () => {
  test('fulfilled', async () => {
    const thunk = new TestAsyncThunk(fetchArticles, {
      articleInfiniteList: {
        page: 1,
      },
    })
    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: articles })
    )
    const result = await thunk.call()

    expect(result.payload).toEqual(articles)
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
