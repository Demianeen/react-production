export type Layer =
  | 'pages'
  | 'widgets'
  | 'features'
  | 'entities'

export interface CreateSliceOptions {
  model: boolean
  api: string
}
