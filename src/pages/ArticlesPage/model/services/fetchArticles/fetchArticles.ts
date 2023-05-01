import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import type { Article } from 'entities/Article'
import { ArticleType } from 'entities/Article'
import {
  getSortedArticleListOrder,
  getSortedArticleListSearch,
  getSortedArticleListSortField,
} from 'features/SortedArticlesList'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'
import { getSortedArticleListType } from 'features/SortedArticlesList/model/selectors/getSortedArticleListType/getSortedArticleListType'
import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit'
import { getArticlesPagePage } from '../../selectors/getArticlesPagePage/getArticlesPagePage'

export interface FetchArticlesProps {
  replace?: boolean
}

// TODO: maybe marge this with sortedArticleList
export const fetchArticles = createAsyncThunk<
  Article[],
  FetchArticlesProps | void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticles',
  async (
    // we use it in slice
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { replace = false } = {},
    { extra, rejectWithValue, getState }
  ) => {
    const page = getArticlesPagePage(getState())
    const limit = getArticlesPageLimit(getState())
    const order = getSortedArticleListOrder(getState())
    const sortField = getSortedArticleListSortField(
      getState()
    )
    const search = getSortedArticleListSearch(getState())
    const type = getSortedArticleListType(getState())

    try {
      addQueryParams({
        sortField,
        order,
        search,
        type,
      })
      const response = await extra.api.get<Article[]>(
        '/articles',
        {
          params: {
            _expand: 'user',
            _page: page,
            _limit: limit,
            _order: order,
            _sort: sortField,
            q: search,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            types_like:
              type === ArticleType.ALL ? undefined : type,
          },
        }
      )

      if (!response.data) {
        return rejectWithValue('error')
      }

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
