import { Button } from 'shared/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from 'entities/Counter/model/slice/counterSlice'
import { getCounterValue } from 'entities/Counter/model/selectors/getCounterValue/getCounterValue'
import { useTranslation } from 'react-i18next'

export const Counter = () => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)
  const { t } = useTranslation()

  const increment = () => {
    dispatch(counterActions.increment())
  }

  const decrement = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button
        onClick={increment}
        data-testid='increment-btn'
      >
        {t('Increment')}
      </Button>
      <Button
        onClick={decrement}
        data-testid='decrement-btn'
      >
        {t('Decrement')}
      </Button>
    </div>
  )
}
