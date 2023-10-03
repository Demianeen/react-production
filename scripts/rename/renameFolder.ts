import fs from 'fs'
import { renameFilesAndDirectories } from './generators/renameFilesAndDirectories'

const pathToFolder = process.argv[2]
const from = process.argv[3]
const to = process.argv[4]

if (
  pathToFolder === undefined ||
  from === undefined ||
  to === undefined
) {
  throw new Error(
    'This command requires path to folder, old name and new name.\n Example: npm run rename:folder src/shared/ui/redesigned/Stack/lib getFlexClassName getFlex',
  )
}

if (!fs.existsSync(pathToFolder)) {
  throw new Error(`Path ${pathToFolder} does not exist.`)
}

renameFilesAndDirectories(pathToFolder, from, to)
