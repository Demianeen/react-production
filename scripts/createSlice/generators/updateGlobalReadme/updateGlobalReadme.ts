import fs from 'fs'
import { capitalize } from 'utils/capitalize'
import { resolveRoot } from 'utils/resolveRoot'
import type { Layer } from '../../types/createSlice'

const findListEnd = (lines: string[], startIndex: number): number => {
  let i = startIndex

  // Skip lines until a list item is found
  while (!lines[i]?.startsWith('-')) {
    i += 1
  }

  // Find the end of the list
  while (lines[i]?.startsWith('-')) {
    i += 1
  }

  return i
}

export const updateGlobalReadme = (
  layer: Layer,
  sliceName: string
) => {
  const readme = fs.readFileSync(resolveRoot('README.md'), 'utf-8')
  const lines = readme.split('\n')
  const capitalizedSliceName = capitalize(sliceName)

  const layerLowerCase = layer.toLowerCase()

  const featuresIndex = lines.findIndex((line) =>
    line.toLowerCase().startsWith(`### ${layerLowerCase}`)
  )

  const listEnd = findListEnd(lines, featuresIndex + 1)
  lines.splice(
    listEnd,
    0,
    `- [${capitalizedSliceName}](./src/${layer}/${capitalizedSliceName}/README.md): `
  )

  const updatedContent = lines.join('\n')

  fs.writeFileSync(resolveRoot('README.md'), updatedContent)
}
