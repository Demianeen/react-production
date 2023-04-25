import type {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
import type { CounterSchema } from 'entities/Counter/model/types/counterSchema'
import type { UserSchema } from 'entities/User/model/types/user.types'
import type { LoginSchema } from 'features/AuthByUsername'
import type { ProfileSchema } from 'entities/Profile'
import type { AxiosInstance } from 'axios'
import type { NavigateOptions, To } from 'react-router-dom'
import type { ArticleDetailsSchema } from 'entities/Article'
import type { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage'
import type { AddCommentFormSchema } from 'features/addCommentForm'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema

  // Async Reducers
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  addCommentForm?: AddCommentFormSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (
    state: StateSchema,
    action: AnyAction
  ) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager
  extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
