import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { PageSchema } from '../types/PageSchema'

const initialState: PageSchema = {
  scrollPosition: {},
}

export const PageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    // TODO: scroll position not restore pages where we delete reducers with data like article details
    setScrollPosition: (
      state,
      {
        payload: { path, position },
      }: PayloadAction<{
        path: string
        position: number
      }>
    ) => {
      state.scrollPosition[path] = position
    },
  },
})

export const { actions: pageActions } = PageSlice
export const { reducer: pageReducer } = PageSlice
