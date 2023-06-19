import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/StoreProvider'
import type { Article } from '@/entities/Article'
import { ArticleType } from '@/entities/Article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'
import { getArticleInfiniteListType } from '../../selectors/getArticleInfinteListType/getArticleInfiniteListType'
import { getArticleInfiniteListOrder } from '../../selectors/getArticleInfiniteListOrder/getArticleInfiniteListOrder'
import { getArticleInfiniteListSortField } from '../../selectors/getArticleInfiniteListSortField/getArticleInfiniteListSortField'
import { getArticleInfiniteListSearch } from '../../selectors/getArticleInfiniteListSearch/getArticleInfiniteListSearch'
import { getArticleInfiniteListPage } from '../../selectors/getArticleInfiniteListPage/getArticleInfiniteListPage'
import { getArticleInfiniteListLimit } from '../../selectors/getArticleInfiniteListLimit/getArticleInfiniteListLimit'

export interface FetchArticlesProps {
  replace?: boolean
}

export const fetchArticles = createAsyncThunk<
  Article[],
  FetchArticlesProps | void,
  ThunkConfig<string>
>(
  'articleInfiniteList/fetchArticles',
  async (
    // we use it in slice
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { replace = false } = {},
    { extra, rejectWithValue, getState }
  ) => {
    const page = getArticleInfiniteListPage(getState())
    const limit = getArticleInfiniteListLimit(getState())
    const order = getArticleInfiniteListOrder(getState())
    const sortField = getArticleInfiniteListSortField(getState())
    const search = getArticleInfiniteListSearch(getState())
    const type = getArticleInfiniteListType(getState())

    try {
      addQueryParams({
        sortField,
        order,
        search,
        type,
      })
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _page: page,
          _limit: limit,
          _order: order,
          _sort: sortField,
          q: search,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          types_like: type === ArticleType.ALL ? undefined : type,
        },
      })

      if (!response.data) {
        return rejectWithValue('error')
      }

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
