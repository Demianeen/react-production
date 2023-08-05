import { getMockEntityAdapterData } from '@/shared/lib/tests/getMockEntityAdapterData/getMockEntityAdapterData'
import { mockComment } from './mockComment'

export const {
  array: mockComments,
  entities: mockCommentEntities,
  ids: mockCommentIds,
} = getMockEntityAdapterData(mockComment, 3)
