import { memo } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useStarRating } from '@/shared/lib/hooks/useStarRating/useStarRating'
import styles from './StarRating.module.scss'
import { Star } from './Star'

export type OnStarSelect = (starNumber: number) => void

interface StarRatingProps {
  className?: string
  /**
   * @description Called when a star is selected
   * @param {number} starNumber
   */
  onSelect: OnStarSelect
  /**
   * @description Height and width of the star
   * @default 2rem
   */
  size?: string
  /**
   * @default 0
   * @description 0 means no stars are selected
   */
  selectedStars?: number
}

const starNumber = [1, 2, 3, 4, 5]

export const StarRating = memo(
  ({
    className,
    onSelect,
    size = '2rem',
    selectedStars = 0,
  }: StarRatingProps) => {
    const [
      { currentStar, isSelected },
      { onHover, onMouseLeave, onClick },
    ] = useStarRating({
      onSelect,
      selectedStars,
    })

    return (
      <div className={classNamesNew(styles.wrapper, className)}>
        {starNumber.map((value) => {
          return (
            <Star
              key={value}
              value={value}
              size={size}
              onSelect={onSelect}
              currentStar={currentStar}
              isSelected={isSelected}
              onMouseEnter={onHover(value)}
              onMouseLeave={onMouseLeave}
              onClick={onClick(value)}
            />
          )
        })}
      </div>
    )
  }
)

StarRating.displayName = 'StarRating'
