import { mockUser } from '@/entities/User/testing'
import articleImage from '@/shared/assets/mocks/article.png'
import { ArticleType } from '../const/articleType'
import type { Article } from '../types/article'

export const mockArticle: Article = {
  id: 1,
  title: 'Javascript news - what is new in JS for 2023?',
  subtitle: 'Что нового в JS за 2022 год?',
  img: articleImage,
  views: 1022,
  user: mockUser,
  createdAt: '26.02.2022',
  types: [ArticleType.IT, ArticleType.SCIENCE, ArticleType.ECONOMICS],
  contentHtmlString:
    '<pre spellcheck="false" data-highlight-language="javascript"><span class="tokenProperty">1234</span><br><span class="tokenAttr">const</span><span> view </span><span class="tokenOperator">=</span><span> </span><span class="tokenFunction">createView</span><span class="tokenPunctuation">(</span><span class="tokenPunctuation">)</span></pre>',
}
