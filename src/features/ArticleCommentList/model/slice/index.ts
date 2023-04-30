import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice'
import { articleCommentListReducer } from './articleCommentListSlice'

export const articleDetailsFooterReducer = combineReducers({
  recommendations: articleDetailsRecommendationsReducer,
  comments: articleCommentListReducer,
})
