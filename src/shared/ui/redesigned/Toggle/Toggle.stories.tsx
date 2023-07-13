import type { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import GridIcon from '@/shared/assets/icons/redesigned/grid.svg'
import ListIcon from '@/shared/assets/icons/redesigned/burger.svg'
import { Icon } from '../Icon'
import { Toggle } from './Toggle'

export default {
  title: 'shared/redesigned/Toggle',
  component: (props) => {
    const [isEnabled, setIsEnabled] = useState(false)
    return (
      <Toggle
        {...props}
        enabled={isEnabled}
        setEnabled={setIsEnabled}
      />
    )
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as Meta<typeof Toggle>

type Story = StoryObj<typeof Toggle>

export const Primary: Story = {
  args: {},
}

export const CustomOnOff: Story = {
  args: {
    offContent: <Icon Svg={ListIcon} clickable noWrapWithButton />,
    onContent: <Icon Svg={GridIcon} clickable noWrapWithButton />,
  },
}
