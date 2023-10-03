import path from 'path'
import fs from 'fs'

interface RenameDirProps {
  dir: string
  decapitalizedOldName: string
  decapitalizedNewName: string
  capitalizedOldSliceName: string
  capitalizedNewSliceName: string
}

export const renameDir = ({
  dir,
  decapitalizedOldName,
  decapitalizedNewName,
  capitalizedOldSliceName,
  capitalizedNewSliceName,
}: RenameDirProps) => {
  try {
    // only rename the directory's name
    const dirBaseName = path.basename(dir)
    if (
      dirBaseName.includes(decapitalizedOldName) ||
      dirBaseName.includes(capitalizedOldSliceName)
    ) {
      const newDir = path.resolve(
        path.dirname(dir),
        dirBaseName
          .replace(decapitalizedOldName, decapitalizedNewName)
          .replace(capitalizedOldSliceName, capitalizedNewSliceName),
      )
      fs.mkdirSync(newDir)
      fs.renameSync(dir, newDir)
      return newDir
    }
    return dir
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to rename directory: ${e.message}`)
    }
    throw new Error('Unexpected error')
  }
}
