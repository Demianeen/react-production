import type {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { CounterSchema } from '@/entities/Counter'
import type { UserSchema } from '@/entities/User'
import type { LoginFormSchema } from '@/features/AuthByUsername'
import type { createReduxStore } from '@/app/providers/StoreProvider'
import type { ProfileSchema } from '@/features/EditableProfileCard'
import type { ArticleDetailsSchema } from '@/entities/Article'
import type { CommentFormSchema } from '@/entities/CommentForm'
import type { PageSchema } from '@/widgets/Page'
import type { rtkApi } from '@/shared/api/rtkApi'
import type { ArticleCommentListSchema } from '@/features/ArticleCommentList'
import type { ArticleInfiniteListSchema } from 'src/widgets/ArticleInfiniteList'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  page: PageSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Async reducers
  loginForm?: LoginFormSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleCommentList?: ArticleCommentListSchema
  commentForm?: CommentFormSchema
  articleInfiniteList?: ArticleInfiniteListSchema
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
