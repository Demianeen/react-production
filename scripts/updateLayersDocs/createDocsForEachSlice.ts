import { Project } from 'ts-morph'
import { resolveRoot } from '../../utils/resolveRoot'
import { getPublicApiExports } from '../../utils/getPublicApiExports'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.md')
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

// slice: entities, features, pages, widgets

const sliceMap: Record<string, string> = {
  pages: 'Page',
  entities: 'Entity',
  features: 'Feature',
  widgets: 'Widget',
}

// TODO: Add documentation inside stories
export const createReadmeForSlice = (layer: string) => {
  if (!Object.keys(sliceMap).includes(layer)) {
    return
  }

  const layerPaths = resolveRoot('src', `${layer}`)
  const layerDirectory = project.getDirectory(layerPaths)
  const slicesDirectories = layerDirectory?.getDirectories()

  slicesDirectories?.forEach((directory) => {
    const dirPath = directory.getPath()
    const readmeFilePath = `${dirPath}/README.md`
    const readmeFile = directory.getSourceFile(
      (f) => f.getBaseName() === 'README.md'
    )

    if (!readmeFile) {
      const publicApiExports = getPublicApiExports(
        `${dirPath}/index.ts`
      )

      let publicApiText = ''
      let publicApiTypes = ''

      publicApiExports.forEach((publicApiExport) => {
        if (publicApiExport.isTypeOnly) {
          publicApiTypes += `\`${publicApiExport.name}\` - \n`
          return
        }
        publicApiText += `\`${publicApiExport.name}\` - \n`
      })

      const sourceCode = `### ${
        sliceMap[layer]
      } ${directory.getBaseName()}

Description:       

#### Public api

- Components

${publicApiText}
- Types

${publicApiTypes}`

      const file = directory.createSourceFile(
        readmeFilePath,
        sourceCode,
        { overwrite: true }
      )
      file.saveSync()
    }
  })
}
