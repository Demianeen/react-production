import type { Layer } from '../../../types/createSlice'

export const storiesTemplate = (
  layer: Layer,
  componentName: string,
  isDefaultExport: boolean
) => {
  const componentImport = isDefaultExport
    ? `import ${componentName} from './${componentName}'`
    : `import { ${componentName} } from './${componentName}'`

  return `import type { ComponentStory, Meta } from '@storybook/react';
${componentImport}

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />

export const Light = Template.bind({});
Light.args = {
   
}`
}
