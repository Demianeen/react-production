/**
 * Estree plugin should be loaded when printing JavaScript, TypeScript, Flow, or JSON.
 */
export const getEstreePlugin = () => import('prettier/plugins/estree')
