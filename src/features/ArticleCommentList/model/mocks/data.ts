/* eslint-disable @typescript-eslint/naming-convention */
import type { Dictionary } from '@reduxjs/toolkit/src/entities/models'
import type { Comment } from '@/entities/Comment'
import { UserRole } from '@/entities/User'

export const ids = [1, 2, 3]
export const entities: Dictionary<Comment> = {
  1: {
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
  2: {
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
  3: {
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
}

export const comments: Comment[] = [
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
