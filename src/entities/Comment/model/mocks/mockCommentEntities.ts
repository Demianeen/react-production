import { getMockEntities } from '@/shared/lib/tests/entities/getMockEntities'
import { getMockIds } from '@/shared/lib/tests/entities/getMockIds'
import { mockUser } from '@/entities/User/testing'
import type { Comment } from '../types/comment'

export const mockComments: Comment[] = [
  {
    id: 1,
    body: 'test',
    user: mockUser,
  },
  {
    id: 2,
    body: 'test',
    user: mockUser,
  },
  {
    id: 3,
    body: 'test',
    user: mockUser,
  },
]

export const mockCommentEntities = getMockEntities(mockComments)
export const mockCommentIds = getMockIds(mockComments)
