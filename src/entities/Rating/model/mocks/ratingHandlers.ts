import { articleRatingHandlers } from '../../../../features/ArticleRating/model/mocks/articleRatingHandlers'
import { profileRatingHandlers } from '../../../../features/ProfileRating/model/mocks/profileRatingHandlers'

export const ratingHandlers = [
  ...articleRatingHandlers,
  ...profileRatingHandlers,
]
