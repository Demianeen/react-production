import fs from 'fs'
import path from 'path'
import { capitalize } from 'utils/capitalize'
import { decapitalize } from 'utils/decapitalize'
import { renameFile } from './renameFile'
import { renameDir } from './renameDir'

export const renameFilesAndDirectories = (
  dir: string,
  oldName: string,
  newName: string
) => {
  const decapitalizedOldName = decapitalize(oldName)
  const decapitalizedNewName = decapitalize(newName)
  const capitalizedOldSliceName = capitalize(oldName)
  const capitalizedNewSliceName = capitalize(newName)

  const newDir = renameDir({
    dir,
    decapitalizedNewName,
    decapitalizedOldName,
    capitalizedNewSliceName,
    capitalizedOldSliceName,
  })

  fs.readdirSync(newDir).forEach((fileName) => {
    const oldFilePath = path.resolve(newDir, fileName)
    if (fs.statSync(oldFilePath).isDirectory()) {
      renameFilesAndDirectories(
        path.resolve(newDir, fileName),
        oldName,
        newName
      )
    } else {
      renameFile({
        decapitalizedNewName,
        decapitalizedOldName,
        capitalizedNewSliceName,
        capitalizedOldSliceName,
        oldFilePath,
        fileName,
        newDir,
      })
    }
  })
}
