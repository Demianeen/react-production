import type { PluginItem } from '@babel/core'

export default (): PluginItem => ({
  visitor: {
    Program: (programPath, state) => {
      const propsToExclude = state.opts.props || []

      programPath.traverse({
        JSXIdentifier: (jsxPath) => {
          const nodeName = jsxPath.node.name

          if (propsToExclude.includes(nodeName)) {
            jsxPath.parentPath.remove()
          }
        },
      })
    },
  },
})
