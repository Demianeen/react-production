import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ArticleBlockType } from '../../model/const/articleBlockType'
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
} as Meta<typeof ArticleCodeBlockComponent>

type Story = StoryObj<typeof ArticleCodeBlockComponent>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
