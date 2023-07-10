import { useState } from 'react'

interface UseStarRatingProps {
  selectedStars?: number
  onSelect: (newStarNumber: number) => void
}

interface UseStarRatingReturnData {
  currentStar: number
  isSelected: boolean
}

interface UseStarRatingBind {
  onHover: (newStarNumber: number) => () => void
  onMouseLeave: () => void
  onClick: (newStarNumber: number) => () => void
}

type UseStarRatingReturn = [
  UseStarRatingReturnData,
  UseStarRatingBind
]

export const useStarRating = ({
  selectedStars = 0,
  onSelect,
}: UseStarRatingProps): UseStarRatingReturn => {
  const [currentStar, setCurrentStar] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

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

  return [
    {
      currentStar,
      isSelected,
    },
    {
      onHover,
      onMouseLeave,
      onClick,
    },
  ]
}
