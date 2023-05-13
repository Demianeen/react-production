import path from 'path'
import fs from 'fs'

interface RenameFileProps {
  newDir: string
  decapitalizedOldName: string
  decapitalizedNewName: string
  capitalizedOldSliceName: string
  capitalizedNewSliceName: string
  oldFilePath: string
  fileName: string
}

export const renameFile = ({
  oldFilePath,
  fileName,
  decapitalizedNewName,
  decapitalizedOldName,
  capitalizedNewSliceName,
  capitalizedOldSliceName,
  newDir,
}: RenameFileProps) => {
  try {
    let fileContent = fs.readFileSync(oldFilePath, 'utf8')

    fileContent = fileContent
      .replace(
        new RegExp(decapitalizedOldName, 'g'),
        decapitalizedNewName
      )
      .replace(
        new RegExp(capitalizedOldSliceName, 'g'),
        capitalizedNewSliceName
      )
    fs.writeFileSync(oldFilePath, fileContent, 'utf8')

    if (
      fileName.includes(decapitalizedOldName) ||
      fileName.includes(capitalizedOldSliceName)
    ) {
      const newFilePath = path.resolve(
        newDir,
        fileName
          .replace(
            decapitalizedOldName,
            decapitalizedNewName
          )
          .replace(
            capitalizedOldSliceName,
            capitalizedNewSliceName
          )
      )
      fs.renameSync(oldFilePath, newFilePath)
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to rename file: ${e.message}`)
    }
    throw new Error('Unexpected error')
  }
}
