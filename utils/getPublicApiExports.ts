import type { ExportSpecifierStructure, SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'

interface GetPublicApiExportsOptions<F extends boolean | undefined> {
  flat: F
}

type FlatReturnType<F extends boolean | undefined> = F extends
  | true
  | undefined
  ? ExportSpecifierStructure[]
  : ExportSpecifierStructure[][]

export const getPublicApiExportNamesFromFile = (
  file: SourceFile
): ExportSpecifierStructure[][] => {
  const exportDeclarations = file.getExportDeclarations()
  const namedExports = exportDeclarations.map((exportDeclaration) =>
    exportDeclaration.getNamedExports()
  )

  return namedExports.map((namedExport) =>
    namedExport.map((oneExport) => oneExport.getStructure())
  )
}

export const getPublicApiExports = <
  F extends boolean | undefined = undefined
>(
  pathToPublicApi: string,
  { flat }: Partial<GetPublicApiExportsOptions<F>> = {}
): FlatReturnType<F> => {
  const project = new Project()

  project.addSourceFileAtPath(pathToPublicApi)

  const file = project.getSourceFile(pathToPublicApi)

  if (file === undefined) return []

  const namedExportsNames = getPublicApiExportNamesFromFile(file)

  if (!flat) {
    return namedExportsNames.flat() as FlatReturnType<F>
  }

  return namedExportsNames as FlatReturnType<F>
}
