# Storybook

Storybook is a tool that allows you to develop and test UI components in isolation. In this project, we use Storybook to describe the different use cases for each component in the file next to it.

## Starting Storybook

To start Storybook, run the following command in your terminal:

- `npm run storybook`

## Writing stories

Stories are written in a file with the `.stories.tsx` extension, located next to the component file.

You can learn more about writing stories in the [official Storybook documentation](https://storybook.js.org/docs/7.1/react/writing-stories/introduction)

Here is an example of a story file for the `EditableProfileCard` component in our app:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { ProfileValidationError } from '../../model/const/profileValidationError'
import { EditableProfileCard } from './EditableProfileCard'

export default {
  title: 'features/EditableProfileCard/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    id: 1,
  },
  decorators: [InitUserDecorator(), LokiDelayDecorator()],
} as Meta<typeof EditableProfileCard>

type Story = StoryObj<typeof EditableProfileCard>

export const Primary: Story = {}

// because of msw, about it later
export const Loading: Story = {}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      profile: {
        validationErrors: [
          ProfileValidationError.NO_DATA,
          ProfileValidationError.INCORRECT_AGE,
          ProfileValidationError.MISSING_AGE,
          ProfileValidationError.MISSING_FIRST_NAME,
          ProfileValidationError.MISSING_LAST_NAME,
          ProfileValidationError.MISSING_USERNAME,
          ProfileValidationError.MISSING_CITY,
          ProfileValidationError.UNKNOWN_SERVER_ERROR,
        ],
      },
    }),
  ],
}
```

For shared components, we write stories for every possible scenario and theme. Here is an example of a story file for the `Button` component:

```tsx
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

type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Clear: Story = {
  args: {
    theme: ButtonTheme.CLEAR,
  },
}

export const ClearInverted: Story = {
  args: {
    theme: ButtonTheme.CLEAR_INVERTED,
  },
}

export const Outline: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
  },
}

export const OutlineSizeL: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L,
  },
}

export const OutlineSizeXL: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL,
  },
}

export const Background: Story = {
  args: {
    theme: ButtonTheme.BACKGROUND,
  },
}

export const BackgroundInverted: Story = {
  args: {
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
}

export const Square: Story = {
  args: {
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
  },
}

export const SquareSizeL: Story = {
  args: {
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.L,
  },
}

export const SquareSizeXL: Story = {
  args: {
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.XL,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
```

## Mocking states

For mocking some error and loading states in stories, we use msw with _msw-storybook-addon_.

You can read about msw [here](./msw.md)

## Story arguments

### Title

Title describes story name and folder when you run storybook.

Example:

```tsx
export default {
  title: 'entities/Article/ArticleList',
  // ...
} as Meta<typeof ArticlesPage>
```

Title should include layer (shared/entities/features/widgets/pages), slice and name of the component. If component renders two different components based on feature flags, add that to `title` as well (e.g. `widgets/Sidebar/Sidebar/deprecated`).

### Component

Pass there component for stories to render.

### Parameters

Parameters are a set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons.

You can read more about them [here](https://storybook.js.org/docs/7.1/react/writing-stories/parameters)

### Decorators

A decorator is a way to wrap a story in extra “rendering” functionality.

You can read more about them [here](https://storybook.js.org/docs/7.1/react/writing-stories/decorators)

All decorators are placed in [src/shared/lib/storybook](../src/shared/lib/storybook). You can read more about each of them there.

> **_NOTE:_** In Storybook, the order in which decorators are applied matters. Decorators are applied in reverse order, from the last decorator to the first decorator. This means that the last decorator in the list will be applied first, and the first decorator in the list will be applied last. It’s important to keep this in mind when defining decorators, as the order can affect how your stories are rendered.
