import { Button } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { counterActions } from '../model/slice/counterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
  const dispatch = useAppDispatch()
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
        type='button'
        onClick={increment}
        data-testid='increment-btn'
      >
        {t('Increment')}
      </Button>
      <Button
        type='button'
        onClick={decrement}
        data-testid='decrement-btn'
      >
        {t('Decrement')}
      </Button>
    </div>
  )
}
