import type { Story } from '@storybook/react'
import type { StateSchema } from 'app/providers/StoreProvider'
import { StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginFormSlice'
// that's okay that we import this not from sort.ts because we use it only in storybook
import { profileReducer } from 'features/EditableProfileCard/model/slice/profileSlice'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice'
import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlesPageSlice'
import { sortedArticleListReducer } from 'features/SortedArticlesList/model/slice/sortedArticleListSlice'
import type { StateSchemaKey } from 'app/providers/StoreProvider/config/stateSchema'
import type { Reducer } from 'redux'
import { articleDetailsFooterReducer } from 'features/ArticleCommentList/model/slice'
import type { ReducersList } from '../hooks/useDynamicModuleLoader/useDynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articlesPage: articlesPageReducer,
  sortedArticleList: sortedArticleListReducer,
  articleDetailsFooter: articleDetailsFooterReducer,
}

export const StoreDecorator = (
  initialState?: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) =>
  function decorator(StoryComponent: Story) {
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
