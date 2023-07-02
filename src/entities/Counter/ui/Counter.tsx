import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/deprecated/Button'
import { useCounterActions } from '../model/slice/counterSlice'
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
  const counterValue = useCounterValue()
  const { t } = useTranslation()
  const { increment, decrement, incrementByAmount } =
    useCounterActions()

  const handleIncrement = () => {
    increment()
  }

  const handleDecrement = () => {
    decrement()
  }

  const handleIncrementByTwo = () => {
    incrementByAmount(2)
  }

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button
        type='button'
        onClick={handleIncrement}
        data-testid='increment-btn'
      >
        {t('Increment')}
      </Button>
      <Button type='button' onClick={handleIncrementByTwo}>
        {t('Increment by 2')}
      </Button>

      <Button
        type='button'
        onClick={handleDecrement}
        data-testid='decrement-btn'
      >
        {t('Decrement')}
      </Button>
    </div>
  )
}
