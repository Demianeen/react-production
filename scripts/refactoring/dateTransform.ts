import { resolveRoot } from 'utils/resolveRoot'
import fs from 'fs'
import type { Article } from '@/entities/Article'

const dbPath = resolveRoot('server', 'db.json')
const fileContent = fs.readFileSync(dbPath, 'utf8')

const dbData = JSON.parse(fileContent)
dbData.articles = dbData.articles.map((article: Article) => {
  const newDate = JSON.stringify(new Date(article.createdAt))
  console.log(article.createdAt, ' -> ', newDate)
  return {
    ...article,
    createdAt: new Date(article.createdAt),
  }
})

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2))
