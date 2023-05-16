import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../../slice/articleInfiniteListSlice'
import { fetchArticlesNextPage } from './fetchArticlesNextPage'

jest.mock('../../slice/articleInfiniteListSlice', () => ({
  __esModule: true,
  articleInfiniteListActions: {
    setPage: jest.fn(),
  },
}))

jest.mock('../fetchArticles/fetchArticles', () => ({
  __esModule: true,
  fetchArticles: jest.fn(),
}))

describe('fetchArticles', () => {
  test('success', async () => {
    const mockedArticleInfiniteListActions = jest.mocked(
      articleInfiniteListActions,
      true
    )

    const thunk = new TestAsyncThunk(
      fetchArticlesNextPage,
      {
        articleInfiniteList: {
          page: 1,
          ids: [],
          entities: {},
          hasMore: true,
          isLoading: false,
          limit: 5,
        },
      }
    )
    await thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(4)
    expect(
      mockedArticleInfiniteListActions.setPage
    ).toHaveBeenCalledWith(2)
  })

  test('fetchArticleList not called when hasMore equal false', () => {
    const thunk = new TestAsyncThunk(
      fetchArticlesNextPage,
      {
        articleInfiniteList: {
          page: 1,
          hasMore: false,
          isLoading: false,
        },
      }
    )
    thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(1)
    expect(fetchArticles).not.toHaveBeenCalled()
  })

  test('fetchArticleList not called when isLoading is true', () => {
    const thunk = new TestAsyncThunk(
      fetchArticlesNextPage,
      {
        articleInfiniteList: {
          page: 1,
          hasMore: false,
          isLoading: true,
        },
      }
    )
    thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(1)
    expect(fetchArticles).not.toHaveBeenCalled()
  })
})
