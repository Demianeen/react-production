import { unified } from 'unified'
import markdown from 'remark-parse'
import fs from 'fs'
import path from 'path'
import { getPublicApiExports } from '../../../utils/getPublicApiExports'

export const comparePublicApiToReadme = async (
  pathToReadme: string
) => {
  const markdownContent = fs.readFileSync(pathToReadme, 'utf-8')
  const tree = await unified().use(markdown).parse(markdownContent)

  const exportsToAdd = getPublicApiExports(
    path.resolve(pathToReadme, '../index.ts')
  ).map((e) => e.alias ?? e.name)
  const exportsToRemove: string[] = []

  tree.children?.forEach((node) => {
    if (node.type === 'paragraph') {
      const paragraph = node.children[0]

      if (paragraph.type === 'inlineCode') {
        const text = paragraph.value
        const index = exportsToAdd.indexOf(text)

        if (index !== -1) {
          exportsToAdd.splice(index, 1)
        } else {
          exportsToRemove.push(text)
        }

        const description = node.children[1]
        if (
          description.type === 'text' &&
          description.value.length < 3
        ) {
          console.warn(
            `Layer description for ${text} is empty at ${pathToReadme}`
          )
        }
      } else if (paragraph.type === 'text') {
        const text = paragraph.value

        if (text === 'Description:') {
          console.warn(`Description is empty at ${pathToReadme}`)
        }
      }
    }
  })

  return {
    exportsToAdd,
    exportsToRemove,
  }
}
