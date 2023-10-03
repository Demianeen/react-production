import { capitalize } from 'utils/capitalize'

export const reduxSliceTemplate = (sliceName: string) => {
  const schemaName = `${sliceName}Schema`
  const capitalizedSchemaName = capitalize(schemaName)

  return `import type { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/lib/store'
import type { ${capitalizedSchemaName} } from '../types/${schemaName}'

const initialState: ${capitalizedSchemaName} = {
}

export const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {
  },
})

export const {
  actions: ${sliceName}Actions,
  reducer: ${sliceName}Reducer,
  useActions: use${sliceName}Actions,
} = ${sliceName}Slice
  `
}
