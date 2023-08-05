import { glob } from 'glob'
import { comparePublicApiToReadme } from './lib/comparePublicApiToReadme'

/**
 * This script checks if README.md files in src/ are up to date with the public API. It compares exports from index.ts with blocks in README.md and prints missing exports and exports that should be removed (if they are no longer in public API).
 *
 * If everything is up to date, nothing is printed.
 */
const checkLayerDocs = async () => {
  const files = await glob('src/**/README.md', {
    ignore: ['**/node_modules/**', '**/build/**'],
  })

  files.forEach(async (pathToReadme) => {
    const { exportsToAdd, exportsToRemove } =
      await comparePublicApiToReadme(pathToReadme)

    const isExportsNotEmpty = exportsToAdd.length > 0
    const isMissingPublicAPIExportsNotEmpty =
      exportsToRemove.length > 0

    if (isExportsNotEmpty || isMissingPublicAPIExportsNotEmpty) {
      console.log(`\n${pathToReadme}`)
    }

    if (isExportsNotEmpty) {
      console.log(`Following items missing in README:`, exportsToAdd)
    }

    if (isMissingPublicAPIExportsNotEmpty) {
      console.log(
        `Remove following items from README:`,
        exportsToRemove
      )
    }
  })
}

checkLayerDocs()
