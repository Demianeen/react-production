import {
  $getSelection,
  $isRangeSelection,
  type LexicalEditor,
} from 'lexical'
import { $createImageBlockNode } from './ImageBlockNode'
import { $createImageNode } from './ImageNode'

export const insertImageBlock = (
  editor: LexicalEditor,
  src: string
) => {
  editor.update(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const { anchor } = selection
      const anchorNode = anchor.getNode()

      const imageBlock = $createImageBlockNode()
      const image = $createImageNode({
        src,
      })
      imageBlock.append(image)

      anchorNode.replace(imageBlock, true)
    }
  })
}
