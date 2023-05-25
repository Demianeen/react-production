import { isStoryNameIncludes } from '@/shared/lib/mock-server/isStoryNameIncludes'

export const isMockLoading = () => {
  return isStoryNameIncludes('loading')
}
