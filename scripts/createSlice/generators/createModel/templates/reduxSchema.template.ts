import { capitalize } from '../../../../../utils/capitalize'

export const reduxSchemaTemplate = (sliceName: string) => {
  const schemaName = `${sliceName}Schema`
  const capitalizedSchemaName = capitalize(schemaName)

  return `export interface ${capitalizedSchemaName} {
}
`
}
