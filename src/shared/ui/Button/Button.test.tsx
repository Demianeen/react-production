import { render, screen } from '@testing-library/react'
import { Button, ButtonTheme } from './Button'

describe('Button', () => {
  test('render', () => {
    render(<Button type='button'>Test</Button>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('clear theme', () => {
    render(
      <Button type='button' theme={ButtonTheme.CLEAR}>
        Test
      </Button>
    )
    expect(screen.getByText('Test')).toHaveClass('clear')
  })
})
