import type { Rating } from '@/entities/Rating'

export interface ProfileRating extends Rating {
  profileId: number
}
