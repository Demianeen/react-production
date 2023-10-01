export { Editor } from './ui/Editor/Editor'
export { Placeholder } from './ui/Placeholder/Placeholder'

// types
export type { EditorSchema } from './model/types/editorSchema'
export { BlockType } from './model/types/editorSchema'

// store
export { useEditorActions } from './model/slice/editorSlice'
export * from './model/selectors/editorMouseSelectors'
export * from './model/selectors/editorSelectionSelectors'

// lib
export { getEditorAnchor } from './lib/getEditorAnchor/getEditorAnchor'
export * from './lib/drag'
export * from './lib/shapes'

// reusable plugins
export { DeleteEditorPlugin } from './ui/plugins/DeleteEditorPlugin/DeleteEditorPlugin'
export { OneLinePlugin } from './ui/plugins/OneLinePlugin/OneLinePlugin'
