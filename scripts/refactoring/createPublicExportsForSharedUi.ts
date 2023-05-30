import { Project } from 'ts-morph'
import { resolveRoot } from '../../utils/resolveRoot'

const project = new Project()

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}')

const sharedUiDir = project.getDirectory(
  resolveRoot('src', 'shared', 'ui')
)

const dirs = sharedUiDir?.getDirectories()

dirs?.forEach((dir) => {
  const indexPath = `${dir.getPath()}/index.ts`
  const index = dir.getSourceFile(indexPath)

  if (index === undefined) {
    const source = `export * from './${dir.getBaseName()}'`
    const newFile = dir.createSourceFile(indexPath, source)
    newFile.saveSync()
  }
})

const isLayer = (path: string) => {
  const layers = [
    'app',
    'shared',
    'entities',
    'features',
    'widgets',
    'pages',
  ]

  return layers.some((layer) => path.startsWith(layer))
}

project.getSourceFiles().forEach((sourceFile) => {
  const importDeclarations =
    sourceFile.getImportDeclarations()

  importDeclarations.forEach((importDeclaration) => {
    const moduleSpecifier = importDeclaration
      .getModuleSpecifierValue()
      .replace('@/', '')

    const segments = moduleSpecifier.split('/')
    const isShared = segments[0] === 'shared'
    const isUi = segments[1] === 'ui'

    if (isLayer(moduleSpecifier) && isShared && isUi) {
      const newImport = segments.slice(0, 3).join('/')
      importDeclaration.setModuleSpecifier(`@/${newImport}`)
    }
  })
})

project.saveSync()
