<!-- TODO: Write here about decorators, how to write stories, msw -->

In the project, story cases are described for each component.
Server requests are mocked using _msw-storybook-addon_.

The file with story cases is created next to the component with the .stories.tsx extension

You can start storybook with the command:

- `npm run storybook`

Example:

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Button, ButtonSize, ButtonTheme } from './Button'

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
    type: 'button',
  },
} as Meta<typeof Button>

type Template = StoryObj<typeof Button>

export const Primary: Template = {}

export const Clear: Template = {
  args: {
    theme: ButtonTheme.CLEAR,
  },
}

export const ClearInverted: Template = {
  args: {
    theme: ButtonTheme.CLEAR_INVERTED,
  },
}

export const Outline: Template = {
  args: {
    theme: ButtonTheme.OUTLINE,
  },
}

export const OutlineSizeL: Template = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L,
  },
}

export const OutlineSizeXL: Template = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL,
  },
}

export const Background: Template = {
  args: {
    theme: ButtonTheme.BACKGROUND,
  },
}

export const BackgroundInverted: Template = {
  args: {
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
}

export const Square: Template = {
  args: {
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
  },
}

export const SquareSizeL: Template = {
  args: {
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.L,
  },
}

export const SquareSizeXL: Template = {
  args: {
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.XL,
  },
}

export const Disabled: Template = {
  args: {
    disabled: true,
  },
}

export const Dark: Template = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Template = {
  decorators: [ThemeDecorator(Theme.RED)],
}
```
