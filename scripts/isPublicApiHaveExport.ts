import { Project } from 'ts-morph'
import { resolveRoot } from '../utils/resolveRoot'

const isPublicApiHaveExport = (
  pathToPublicApi: string,
  exportedObject: string
) => {
  const project = new Project()

  project.addSourceFileAtPath(pathToPublicApi)

  const file = project.getSourceFile(pathToPublicApi)

  if (file == null) return false

  const exportDeclarations = file.getExportDeclarations()
  const namedExports = exportDeclarations.map(
    (exportDeclaration) =>
      exportDeclaration.getNamedExports()
  )

  for (let i = 0; i < namedExports.length; i += 1) {
    for (let j = 0; j < namedExports[i].length; i += 1) {
      if (namedExports[i][j].getName() === exportedObject)
        return true
    }
  }

  return false
}

console.log(
  isPublicApiHaveExport(
    resolveRoot('src', 'entities', 'user', 'index.ts'),
    'UserRole'
  )
)
