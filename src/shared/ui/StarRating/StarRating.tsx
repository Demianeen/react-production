import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon, IconType } from '@/shared/ui/Icon'
import StarIcon from '@/shared/assets/icons/star-24-22.svg'
import styles from './StarRating.module.scss'

interface StarRatingProps {
  className?: string
  onSelect: (starNumber: number) => void
  size?: string
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
