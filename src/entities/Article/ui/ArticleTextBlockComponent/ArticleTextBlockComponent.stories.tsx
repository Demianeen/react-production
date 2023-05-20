import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import type { ArticleTextBlock } from '../../model/types/article'
import { ArticleBlockType } from '../../model/types/article'
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent'

const block: ArticleTextBlock = {
  id: 9,
  type: ArticleBlockType.TEXT,
  paragraphs: [
    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
  ],
}

export default {
  title: 'entities/Article/ArticleTextBlockComponent',
  component: ArticleTextBlockComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    block,
  },
} as Meta<typeof ArticleTextBlockComponent>

const Template: ComponentStory<
  typeof ArticleTextBlockComponent
> = (args) => <ArticleTextBlockComponent {...args} />

export const WithoutTitle = Template.bind({})
WithoutTitle.args = {}

export const WithTitle = Template.bind({})
WithTitle.args = {
  block: {
    ...block,
    title: 'Title',
  },
}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
