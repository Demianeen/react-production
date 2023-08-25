import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { KeyboardEvent } from 'react'
import { useCallback } from 'react'
import StarFilledIcon from '@/shared/assets/icons/redesigned/starFilled.svg'
import StarIcon from '@/shared/assets/icons/redesigned/star.svg'
import { Icon } from '../Icon'
import type { OnStarSelect } from './StarRating'
import styles from './StarRating.module.scss'

interface StarProps {
  value: number
  currentStar: number
  isSelected: boolean
  size: string
  onSelect: OnStarSelect
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const mapStarRatingToTooltipText: Record<number, string> = {
  1: 'Bad',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
}

export const Star = typedMemo(
  ({
    value,
    size,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isSelected,
    currentStar,
  }: StarProps) => {
    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Space') {
          onClick()
        }
      },
      [onClick]
    )

    const isHighlighted = value <= currentStar

    return (
      <Icon
        Svg={isHighlighted ? StarFilledIcon : StarIcon}
        role='presentation'
        width={size}
        height={size}
        className={styles.button}
        iconClassName={classNamesNew(styles.normal, {
          [styles.selected]: isSelected,
        })}
        data-testid={`StarRating.${value}`}
        data-selected={isHighlighted}
        onClick={onClick}
        buttonProps={{
          'aria-label': `Star ${value}`,
          tabIndex: isSelected ? -1 : 0,
          onKeyDown,
          onMouseEnter,
          onMouseLeave,
          noBorderRadius: true,
        }}
        tooltipText={mapStarRatingToTooltipText[value]}
      />
    )
  }
)
