import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Code } from './Code'

export default {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    text: `class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  get Name(): string {
    return this.name;
  }

  get Age(): number {
    return this.age;
  }

  set Age(age: number) {
    this.age = age;
  }

  sayHello(): void {
    console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
  }
}

function double(n: number): number {
  return n * 2;
}
`,
  },
} as ComponentMeta<typeof Code>

const Template: ComponentStory<typeof Code> = (args) => (
  <Code {...args} />
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
