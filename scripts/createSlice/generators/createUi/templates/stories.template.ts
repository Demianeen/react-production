import type { Layer } from '../../../types/createSlice'

export const storiesTemplate = (
  layer: Layer,
  componentName: string
) => {
  return `import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />

export const Light = Template.bind({});
Light.args = {
   
}`
}
