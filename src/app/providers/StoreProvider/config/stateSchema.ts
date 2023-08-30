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
import type { EditableProfileSchema } from '@/features/EditableProfileCard'
import type { ArticleDetailsSchema } from '@/entities/Article'
import type { CommentFormSchema } from '@/entities/CommentForm'
import type { PageSchema } from '@/widgets/Page'
import type { rtkApi } from '@/shared/api/rtkApi'
import type { ArticleCommentListSchema } from '@/features/ArticleCommentList'
import type { ArticleInfiniteListSchema } from 'src/widgets/ArticleInfiniteList'
import type { CreateArticleSchema } from '@/widgets/CreateArticle'
import type { RegistrationFormSchema } from '../../../../features/AuthByUsername/model/types/registrationFormSchema'

export interface AsyncReducers {
  loginForm: LoginFormSchema
  registrationForm: RegistrationFormSchema
  profile: EditableProfileSchema
  articleDetails: ArticleDetailsSchema
  articleCommentList: ArticleCommentListSchema
  commentForm: CommentFormSchema
  articleInfiniteList: ArticleInfiniteListSchema
  createArticle: CreateArticleSchema
}

export type AsyncReducersList = {
  [Name in keyof AsyncReducers]?: Reducer<
    NonNullable<AsyncReducers[Name]>
  >
}

export interface StateSchema extends Partial<AsyncReducers> {
  counter: CounterSchema
  user: UserSchema
  page: PageSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type StateSchemaKey = keyof StateSchema

export type ReducersList = {
  [Name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[Name]>>
}

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
  meta: any
}
