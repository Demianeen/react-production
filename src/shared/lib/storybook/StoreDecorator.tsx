import type { Reducer } from 'redux'
import type { StoryFn } from '@storybook/react'
import type { StateSchema } from '@/app/providers/StoreProvider'
import { StoreProvider } from '@/app/providers/StoreProvider'
import {
  loginReducer,
  registrationFormReducer,
} from '@/features/AuthByUsername/testing'
import { profileReducer } from '@/features/EditableProfileCard/testing'
import { articleDetailsReducer } from '@/entities/Article/testing'
import type {
  AsyncReducersList,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/stateSchema'
import { commentFormReducer } from '@/entities/CommentForm/testing'
import { articleCommentListReducer } from '@/features/ArticleCommentList/testing'
import { articleInfiniteListReducer } from '@/widgets/ArticleInfiniteList/testing'
import { createArticleReducer } from '@/pages/CreateArticlePage/testing'
import { editorReducer } from '@/entities/Editor/testing'

const defaultAsyncReducers: Required<AsyncReducersList> = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  commentForm: commentFormReducer,
  articleCommentList: articleCommentListReducer,
  articleInfiniteList: articleInfiniteListReducer,
  registrationForm: registrationFormReducer,
  createArticle: createArticleReducer,
  editor: editorReducer,
}

export const StoreDecorator =
  (
    initialState?: DeepPartial<StateSchema>,
    asyncReducers?: AsyncReducersList,
  ) =>
  (StoryComponent: StoryFn) => (
    <StoreProvider
      preloadedState={initialState}
      preloadedAsyncReducers={{
        ...(defaultAsyncReducers as Record<StateSchemaKey, Reducer>),
        ...asyncReducers,
      }}
    >
      <StoryComponent />
    </StoreProvider>
  )
