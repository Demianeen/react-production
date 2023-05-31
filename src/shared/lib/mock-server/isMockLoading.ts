import { isStoryNameIncludes } from './isStoryNameIncludes'

export const isMockLoading = () => {
  return isStoryNameIncludes('loading')
}
