import { isStoryNameIncludes } from 'shared/lib/mock-server/isStoryNameIncludes'

export const isMockError = () => {
  return isStoryNameIncludes('error')
}
