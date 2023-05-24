import { capitalize } from '../../../../../utils/capitalize'

export const reduxSliceTemplate = (sliceName: string) => {
  const schemaName = `${sliceName}Schema`
  const capitalizedSchemaName = capitalize(schemaName)

  return `import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ${capitalizedSchemaName} } from '../types/${schemaName}'

const initialState: ${capitalizedSchemaName} = {
}

export const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginByUsername.pending, (state) => {
  //       state.error = undefined
  //       state.isLoading = true
  //     })
  //     .addCase(loginByUsername.fulfilled, (state) => {
  //       state.isLoading = false
  //     })
  //     .addCase(
  //       loginByUsername.rejected,
  //       (state, action) => {
  //         state.isLoading = false
  //         if (typeof action.payload === 'string') {
  //           state.error = action.payload
  //         }
  //       }
  //     )
  // },
})

export const { actions: ${sliceName}Actions } =
  ${sliceName}Slice
export const { reducer: ${sliceName}Reducer } =
  ${sliceName}Slice`
}
