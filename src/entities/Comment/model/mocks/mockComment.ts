import { mockUser } from '@/entities/User/testing'
import type { Comment } from '../types/comment'

export const mockComment: Comment = {
  id: 1,
  body: 'test',
  user: mockUser,
}
