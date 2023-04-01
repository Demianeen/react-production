import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  test('render', () => {
    render(<Button>Test</Button>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('clear theme', () => {
    render(<Button theme={ButtonTheme.CLEAR}>Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('clear')
  })
})
