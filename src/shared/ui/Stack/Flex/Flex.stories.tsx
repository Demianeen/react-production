import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { Flex } from './Flex'

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = (args) => (
  <Flex {...args} />
)

const children = (
  <>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </>
)

export const Row = Template.bind({})
Row.args = {
  direction: 'row',
  children,
}

export const RowGap025 = Template.bind({})
RowGap025.args = {
  direction: 'row',
  gap: 0.25,
  children,
}

export const RowGap05 = Template.bind({})
RowGap05.args = {
  direction: 'row',
  gap: 0.5,
  children,
}

export const RowGap1 = Template.bind({})
RowGap1.args = {
  direction: 'row',
  gap: 1,
  children,
}

export const RowGap2 = Template.bind({})
RowGap2.args = {
  direction: 'row',
  gap: 2,
  children,
}

export const Column = Template.bind({})
Column.args = {
  direction: 'column',
  children,
}

export const ColumnGap1 = Template.bind({})
ColumnGap1.args = {
  direction: 'column',
  gap: 1,
  children,
}

const ColumnAlignEnd = Template.bind({})
ColumnAlignEnd.args = {
  direction: 'column',
  align: 'end',
  children,
}
