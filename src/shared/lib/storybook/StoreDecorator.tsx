import type { Reducer } from 'redux'
import type { StoryFn } from '@storybook/react'
import type { StateSchema } from '@/app/providers/StoreProvider'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { profileReducer } from '@/features/EditableProfileCard/testing'
import { articleDetailsReducer } from '@/entities/Article/testing'
import type { StateSchemaKey } from '@/app/providers/StoreProvider/config/stateSchema'
import { commentFormReducer } from '@/entities/CommentForm/testing'
import { articleCommentListReducer } from '@/features/ArticleCommentList/testing'
import { articleInfiniteListReducer } from '@/features/ArticleInfiniteList/testing'
import type { ReducersList } from '../hooks/useDynamicModuleLoader/useDynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  commentForm: commentFormReducer,
  articleCommentList: articleCommentListReducer,
  articleInfiniteList: articleInfiniteListReducer,
}

export const StoreDecorator = (
  initialState?: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) =>
  function decorator(StoryComponent: StoryFn) {
    return (
      <StoreProvider
        preloadedState={initialState}
        preloadedAsyncReducers={{
          ...(defaultAsyncReducers as Record<
            StateSchemaKey,
            Reducer
          >),
          ...asyncReducers,
        }}
      >
        <StoryComponent />
      </StoreProvider>
    )
  }
