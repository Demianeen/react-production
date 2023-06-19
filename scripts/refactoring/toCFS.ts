import fs from 'fs'
import path from 'path'

const directoryPath = 'src'

const transformStoryFile = (sourceFilePath: string) => {
  fs.readFile(sourceFilePath, 'utf8', (dirErr, data) => {
    if (dirErr) {
      console.error('Error reading the source file:', dirErr)
      return
    }

    const transformedImport = data.replace(
      /import type { ComponentStory, Meta } from '@storybook\/react'/g,
      "import type { StoryObj, Meta } from '@storybook/react'"
    )

    const transformedTemplate = transformedImport.replace(
      /const\s*Template:\s*ComponentStory<\s*?typeof\s*(\w+)\s*?>\s*=\s*\(\s*.*?\s*\)\s*=>\s*\(?\s*?<(\w+)\s*.+\/>\s*\)?/gm,
      'type Story = StoryObj<typeof $1>\n'
    )

    const transformedStories = transformedTemplate.replace(
      /export const (\w+) = Template\.bind\({}\)\s*\n\w+\.args = {([\s\S]*?)}(?:\s*\n\w+\.decorators = \[([\s\S]*?)])?(?!,)/g,
      (_match, p1, p2, p3) => {
        const argsCode = p2 ? `args: { ${p2} },` : ''
        const decoratorsCode = p3 ? `decorators: [${p3}],` : ''
        return `export const ${p1}: Story = { ${argsCode} ${decoratorsCode} }`
      }
    )

    // Write the transformed code to the destination file
    fs.writeFile(
      sourceFilePath,
      transformedStories,
      'utf8',
      (fileErr) => {
        if (fileErr) {
          console.error(
            'Error writing the transformed code to the destination file:',
            fileErr
          )
          return
        }

        console.log(
          `Code transformation complete for file: ${sourceFilePath}`
        )
      }
    )
  })
}

function processFiles(directory: string) {
  fs.readdir(directory, (dirErr, files) => {
    if (dirErr) {
      console.error('Error reading the directory:', dirErr)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file)

      fs.stat(filePath, (fileErr, stats) => {
        if (fileErr) {
          console.error('Error reading file stats:', fileErr)
          return
        }

        if (stats.isDirectory()) {
          // Recursively process files in subdirectory
          processFiles(filePath)
        } else if (file.endsWith('.stories.tsx')) {
          // Process the story file
          transformStoryFile(filePath)
        }
      })
    })
  })
}

processFiles(directoryPath)
