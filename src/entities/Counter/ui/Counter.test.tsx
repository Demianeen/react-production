import { componentRender } from 'shared/lib/tests/componentRender/componentRender'
import { Counter } from 'entities/Counter'
import { screen } from '@testing-library/react'

describe('Counter', () => {
  it('should render', () => {
    componentRender(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    })
    expect(
      screen.getByTestId('value-title')
    ).toHaveTextContent('10')
  })

  it('should render with default value', () => {
    componentRender(<Counter />)
    expect(
      screen.getByTestId('value-title')
    ).toHaveTextContent('0')
  })

  it('should increment value', async () => {
    const { user } = componentRender(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    })

    await user.click(screen.getByTestId('increment-btn'))
    expect(
      screen.getByTestId('value-title')
    ).toHaveTextContent('11')
  })

  it('should decrement value', async () => {
    const { user } = componentRender(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    })

    await user.click(screen.getByTestId('decrement-btn'))
    expect(
      screen.getByTestId('value-title')
    ).toHaveTextContent('9')
  })
})
