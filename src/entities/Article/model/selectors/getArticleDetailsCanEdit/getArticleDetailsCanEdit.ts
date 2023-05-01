import { createSelector } from '@reduxjs/toolkit'
import { getUserId } from 'entities/User'
import { getArticleDetailsAuthor } from '../getArticleDetailsAuthor/getArticleDetailsAuthor'

export const getArticleDetailsCanEdit = createSelector(
  getUserId,
  getArticleDetailsAuthor,

  (userId, articleAuthor) => {
    // because undefined === undefined is true
    if (!articleAuthor || !userId) {
      return false
    }
    return articleAuthor?.id === userId
  }
)
