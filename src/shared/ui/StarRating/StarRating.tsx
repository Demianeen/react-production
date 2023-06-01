import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import StarIcon from '@/shared/assets/icons/star-24-22.svg'
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

export const StarRating = memo(
  ({
    className,
    onSelect,
    size = '2rem',
    selectedStars = 0,
  }: StarRatingProps) => {
    const [currentStar, setCurrentStar] =
      useState(selectedStars)
    const [isSelected, setIsSelected] = useState(
      Boolean(selectedStars)
    )

    // we don't wrap these in useCallback because it will change svg classnames and cause a re-render
    const onHover = (newStarNumber: number) => () => {
      if (isSelected) return
      setCurrentStar(newStarNumber)
    }

    const onMouseLeave = () => {
      if (isSelected) return
      setCurrentStar(0)
    }

    const onClick = (newStarNumber: number) => () => {
      if (isSelected) return

      onSelect(newStarNumber)
      setIsSelected(true)
      setCurrentStar(newStarNumber)
    }

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
            />
          )
        })}
      </div>
    )
  }
)

StarRating.displayName = 'StarRating'
