import type {
  CounterSchema,
  counterSliceName,
} from 'entities/Counter'
import type {
  UserSchema,
  userSliceName,
} from 'entities/User'
import type {
  LoginFormSchema,
  loginFormSliceName,
} from 'features/AuthByUsername'
import type {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
import type { createReduxStore } from 'app/providers/StoreProvider'
import type { AxiosInstance } from 'axios'
import type { ProfileSchema } from 'features/EditableProfileCard'
import type { ArticleDetailsSchema } from 'entities/Article'
import type { AddCommentFormSchema } from 'features/AddCommentForm'
import type { ArticlesPageSchema } from 'pages/ArticlesPage'
import type { PageSchema } from 'widgets/Page'
import type { ArticleDetailsFooterSchema } from 'features/ArticleCommentList'
import type { SortedArticleListSchema } from 'features/SortedArticlesList'

export interface StateSchema {
  [counterSliceName]: CounterSchema
  [userSliceName]: UserSchema
  page: PageSchema

  // Async reducers
  [loginFormSliceName]?: LoginFormSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsFooter?: ArticleDetailsFooterSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  sortedArticleList?: SortedArticleListSchema
}

export type StateSchemaKey = keyof StateSchema
export type StateReducer = Reducer<StateSchema>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: StateReducer
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithReducerManager
  extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export type AppDispatch = ReturnType<
  typeof createReduxStore
>['dispatch']

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<E> {
  rejectValue: E
  extra: ThunkExtraArg
  state: StateSchema
}
