import type { SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'

interface GetPublicApiExportsOptions<F extends boolean | undefined> {
  flat: F
}

type FlatReturnType<F extends boolean | undefined> = F extends
  | true
  | undefined
  ? PublicApiExport[]
  : PublicApiExport[][]

interface PublicApiExport {
  name: string
  isTypeOnly: boolean
}

export const getPublicApiExportNamesFromFile = (
  file: SourceFile
): PublicApiExport[][] => {
  const exportDeclarations = file.getExportDeclarations()
  const namedExports = exportDeclarations.map((exportDeclaration) =>
    exportDeclaration.getNamedExports()
  )

  return namedExports.map((namedExport) =>
    namedExport.map((oneExport) => ({
      name: oneExport.getName().toString(),
      isTypeOnly: oneExport.isTypeOnly(),
    }))
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
