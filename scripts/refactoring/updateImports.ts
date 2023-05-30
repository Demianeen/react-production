import { Project } from 'ts-morph'

const project = new Project()

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}')

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
  const exportDeclarations =
    sourceFile.getExportDeclarations()

  importDeclarations.forEach((importDeclaration) => {
    const moduleSpecifier =
      importDeclaration.getModuleSpecifierValue()

    if (isLayer(moduleSpecifier)) {
      importDeclaration.setModuleSpecifier(
        `@/${moduleSpecifier}`
      )
    }
  })

  exportDeclarations.forEach((exportDeclaration) => {
    const moduleSpecifier =
      exportDeclaration.getModuleSpecifierValue()

    if (moduleSpecifier === undefined) return

    if (isLayer(moduleSpecifier)) {
      exportDeclaration.setModuleSpecifier(
        `@/${moduleSpecifier}`
      )
    }
  })
})

project.saveSync()
