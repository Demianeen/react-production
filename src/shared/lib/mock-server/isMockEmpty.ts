import { isStoryNameIncludes } from 'shared/lib/mock-server/isStoryNameIncludes'

export const isMockEmpty = () => {
  return isStoryNameIncludes('empty')
}
