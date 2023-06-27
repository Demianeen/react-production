import { UserRole } from '../const/userRole'
import type { User } from '../types/userSchema'

export const mockUser: User = {
  id: 1,
  username: 'admin',
  roles: [UserRole.ADMIN],
  features: {
    isArticleCreationEnabled: true,
    isArticleRatingEnabled: true,
    isCounterEnabled: true,
  },
  avatar:
    'https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%252Fusers%252Fcldzwest200dfb70s3i8pc564_5w13le5_picture.jpg&w=256&q=75',
}
