import { UserRole } from '@/entities/User'
import type { Comment } from '../types/comment'

export const mockComments: Comment[] = [
  {
    id: 1,
    body: 'test',
    user: {
      id: 1,
      username: 'test',
      avatar:
        'https://i.pinimg.com/564x/db/6b/a8/db6ba8c0e0244f71230e6aae953e57be.jpg',
      roles: [UserRole.ADMIN],
    },
  },
  {
    id: 2,
    body: 'test',
    user: {
      id: 1,
      username: 'test',
      avatar:
        'https://i.pinimg.com/564x/db/6b/a8/db6ba8c0e0244f71230e6aae953e57be.jpg',
      roles: [UserRole.MANAGER],
    },
  },
  {
    id: 3,
    body: 'test',
    user: {
      id: 2,
      username: 'username',
      avatar:
        'https://i.pinimg.com/564x/db/6b/a8/db6ba8c0e0244f71230e6aae953e57be.jpg',
      roles: [UserRole.USER],
    },
  },
]
