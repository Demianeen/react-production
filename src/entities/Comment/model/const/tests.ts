import type { Comment } from 'entities/Comment'

export const comments: Comment[] = [
  {
    id: 1,
    body: 'test',
    user: {
      id: 1,
      username: 'test',
      avatar:
        'https://i.pinimg.com/564x/db/6b/a8/db6ba8c0e0244f71230e6aae953e57be.jpg',
      role: 'ADMIN',
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
      role: 'ADMIN',
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
      role: 'USER',
    },
  },
]
