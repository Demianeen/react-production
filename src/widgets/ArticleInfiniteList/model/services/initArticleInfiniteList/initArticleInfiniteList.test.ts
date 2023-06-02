import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../../slice/articleInfiniteListSlice'
import { initArticleInfiniteList } from './initArticleInfiniteList'

jest.mock('../../slice/articleInfiniteListSlice', () => ({
  __esModule: true,
  articleInfiniteListActions: {
    initState: jest.fn(),
  },
}))

jest.mock('../fetchArticles/fetchArticles', () => ({
  __esModule: true,
  fetchArticles: jest.fn(),
}))

describe('initArticleInfiniteList', () => {
  test('initialized', () => {
    const thunk = new TestAsyncThunk(
      initArticleInfiniteList,
      {
        articleInfiniteList: {
          _isInitialized: false,
        },
      }
    )
    thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(
      articleInfiniteListActions.initState
    ).toHaveBeenCalled()
    expect(fetchArticles).toHaveBeenCalled()
  })

  test('not initialized', () => {
    const thunk = new TestAsyncThunk(
      initArticleInfiniteList,
      {
        articleInfiniteList: {
          _isInitialized: true,
        },
      }
    )
    thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(1)
    expect(
      articleInfiniteListActions.initState
    ).not.toHaveBeenCalled()
    expect(fetchArticles).not.toHaveBeenCalled()
  })
})
