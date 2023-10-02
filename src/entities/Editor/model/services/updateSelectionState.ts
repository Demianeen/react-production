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
import { getSelectedNode } from '../../lib/getSelectedNode/getSelectedNode'
import { BlockType } from '../types/editorSchema'
import { editorActions } from '../slice/editorSlice'

/**
 * Updates the block type of the current selection.
 */
export const [useUpdateSelectionBlockType, updateSelectionBlockType] =
  buildAsyncThunk(
    'editor/updateBlockType',
    async (activeEditor: LexicalEditor, { dispatch }) => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode()
        let node =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent()
                return parent !== null && $isRootOrShadowRoot(parent)
              })

        if (node === null) {
          node = anchorNode.getTopLevelElementOrThrow()
        }

        // update node key
        dispatch(editorActions.setSelectionNodeKey(node.getKey()))

        const selectedNode = getSelectedNode(selection)

        dispatch(
          editorActions.setSelectionSelectedNodeKey(
            selectedNode.getKey(),
          ),
        )

        // update block type
        const elementKey = node.getKey()
        const elementDOM = activeEditor.getElementByKey(elementKey)

        if (elementDOM !== null) {
          if ($isListNode(node)) {
            const parentList =
              $getNearestNodeOfType<ListNode>(anchorNode, ListNode) ??
              node
            const type = parentList.getTag()

            if (isEnumInclude(BlockType, type)) {
              dispatch(editorActions.setSelectionBlockType(type))
            }
          } else {
            const type = $isHeadingNode(node)
              ? node.getTag()
              : node.getType()
            if (isEnumInclude(BlockType, type)) {
              dispatch(editorActions.setSelectionBlockType(type))
            }
          }
        }
      }
    },
  )
