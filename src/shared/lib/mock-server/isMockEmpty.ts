import { isStoryNameIncludes } from './isStoryNameIncludes'

export const isMockEmpty = () => {
  return isStoryNameIncludes('empty')
}
