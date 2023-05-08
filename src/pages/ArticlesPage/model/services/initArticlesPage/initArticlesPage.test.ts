import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { articlesPageActions } from '../../slice/articlesPageSlice'
import { initArticlesPage } from './initArticlesPage'

jest.mock('../../slice/articlesPageSlice', () => ({
  __esModule: true,
  articlesPageActions: {
    initState: jest.fn(),
  },
}))

jest.mock('../fetchArticles/fetchArticles', () => ({
  __esModule: true,
  fetchArticles: jest.fn(),
}))

describe('initArticlesPage', () => {
  test('initialized', () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        _isInitialized: false,
      },
    })
    thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(articlesPageActions.initState).toHaveBeenCalled()
    expect(fetchArticles).toHaveBeenCalled()
  })

  test('not initialized', () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        _isInitialized: true,
      },
    })
    thunk.call()

    expect(thunk.dispatch).toHaveBeenCalledTimes(1)
    expect(
      articlesPageActions.initState
    ).not.toHaveBeenCalled()
    expect(fetchArticles).not.toHaveBeenCalled()
  })
})
