import type { StateSchema } from 'app/providers/StoreProvider'
import { StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginFormSlice'
// that's okay that we import this not from sort.ts because we use it only in storybook
import { profileReducer } from 'features/EditableProfileCard/model/slice/profileSlice'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import type { StateSchemaKey } from 'app/providers/StoreProvider/config/stateSchema'
import type { Reducer } from 'redux'
import { commentFormReducer } from 'entities/CommentForm/model/slice/commentFormSlice'
import { articleCommentListReducer } from 'features/ArticleCommentList/model/slice/articleCommentListSlice'
import { articleInfiniteListReducer } from 'features/ArticleInfiniteList/model/slice/articleInfiniteListSlice'
import type { StoryFn } from '@storybook/react'
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
