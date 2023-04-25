import { createSelector } from '@reduxjs/toolkit'
import { ArticleView } from 'entities/Article'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageView = createSelector(
  getArticlesPageState,
  (state) => state?.view ?? ArticleView.GRID
)
