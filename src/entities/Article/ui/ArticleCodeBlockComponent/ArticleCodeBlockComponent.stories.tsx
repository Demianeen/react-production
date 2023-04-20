import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { ArticleBlockType } from '../../model/types/article'
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent'

export default {
  title: 'entities/Article/ArticleCodeBlockComponent',
  component: ArticleCodeBlockComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    block: {
      type: ArticleBlockType.CODE,
      id: 1,
      code: `class Person {
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
  },
} as ComponentMeta<typeof ArticleCodeBlockComponent>

const Template: ComponentStory<
  typeof ArticleCodeBlockComponent
> = (args) => <ArticleCodeBlockComponent {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
