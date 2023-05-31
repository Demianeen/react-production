import { isStoryNameIncludes } from './isStoryNameIncludes'

export const isMockError = () => {
  return isStoryNameIncludes('error')
}
