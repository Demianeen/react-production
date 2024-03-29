import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import StarIcon from '@/shared/assets/icons/deprecated/star-24-22.svg'
import { useStarRating } from '@/shared/lib/hooks/useStarRating/useStarRating'
import { Icon, IconType } from '../Icon'
import styles from './StarRating.module.scss'

interface StarRatingProps {
  className?: string
  /**
   * @description Called when a star is selected
   * @param {number} starNumber
   */
  onSelect: (starNumber: number) => void
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

/**
 * Use components from redesigned folder
 * @deprecated
 */
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
      <div className={className}>
        {starNumber.map((value) => {
          return (
            <Icon
              Svg={StarIcon}
              key={value}
              role='presentation'
              type={IconType.NONE}
              width={size}
              height={size}
              className={classNames(styles.normal, {
                [styles.highlighted]: value <= currentStar,
                [styles.selected]: isSelected,
              })}
              onMouseEnter={onHover(value)}
              onMouseLeave={onMouseLeave}
              onClick={onClick(value)}
              data-testid={`StarRating.${value}`}
              data-selected={value <= currentStar}
            />
          )
        })}
      </div>
    )
  }
)

StarRating.displayName = 'StarRating'
