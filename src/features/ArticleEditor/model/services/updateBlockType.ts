import { buildAsyncThunk } from '@/shared/lib/store/buildAsyncThunk'
import { isEnumInclude } from '@/shared/lib/typescript/isEnumInclude'
import { $isListNode, ListNode } from '@lexical/list'
import { $isHeadingNode } from '@lexical/rich-text'
import {
  $findMatchingParent,
  $getNearestNodeOfType,
} from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  type LexicalEditor,
} from 'lexical'
import { BlockType } from '../types/articleEditorSchema'
import { articleEditorActions } from '../slice/articleEditorSlice'

/**
 * Updates the block type of the current selection.
 */
export const [useUpdateBlockType, updateBlockType] = buildAsyncThunk(
  'articleEditor/updateBlockType',
  async (activeArticleEditor: LexicalEditor, { dispatch }) => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM =
        activeArticleEditor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList =
            $getNearestNodeOfType<ListNode>(anchorNode, ListNode) ??
            element
          const type = parentList.getTag()

          if (isEnumInclude(BlockType, type)) {
            dispatch(articleEditorActions.setBlockType(type))
          }
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          if (isEnumInclude(BlockType, type)) {
            dispatch(articleEditorActions.setBlockType(type))
          }
          // if ($isCodeNode(element)) {
          //   const language =
          //     element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
          //   setCodeLanguage(
          //     language
          //       ? CODE_LANGUAGE_MAP[language] || language
          //       : ''
          //   )
          //   return
          // }
        }
      }
    }
  }
)
