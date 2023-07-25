import type { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import GridIcon from '@/shared/assets/icons/redesigned/grid.svg'
import ListIcon from '@/shared/assets/icons/redesigned/burger.svg'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import GridIconDeprecated from '@/shared/assets/icons/deprecated/grid-24-24.svg'
import ListIconDeprecated from '@/shared/assets/icons/deprecated/list-24-24.svg'
import { Icon as IconDeprecated } from '../../deprecated/Icon'
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

export const Deprecated: Story = {
  args: {},
  decorators: [ToggleDesignDecorator(false)],
}

export const CustomOnOff: Story = {
  args: {
    offContent: <Icon Svg={ListIcon} clickable noWrapWithButton />,
    onContent: <Icon Svg={GridIcon} clickable noWrapWithButton />,
  },
}

export const CustomOnOffDeprecated: Story = {
  args: {
    offContent: (
      <IconDeprecated
        Svg={ListIconDeprecated}
        height={24}
        width={24}
      />
    ),
    onContent: (
      <IconDeprecated
        Svg={GridIconDeprecated}
        height={24}
        width={24}
      />
    ),
  },
  decorators: [ToggleDesignDecorator(false)],
}
