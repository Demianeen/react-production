import type { Layer } from '../../../types/createSlice'

export const storiesTemplate = (
  layer: Layer,
  componentName: string,
  isDefaultExport: boolean
) => {
  const componentImport = isDefaultExport
    ? `import ${componentName} from './${componentName}'`
    : `import { ${componentName} } from './${componentName}'`

  return `import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
${componentImport}

export default {
  title: '$PARENT_DIR/${componentName}',
  component: ${componentName},
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
  },
  parameters: {
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ${componentName}>

type Story = StoryObj<typeof ${componentName}>

export const Light: Story = {}
`
}
