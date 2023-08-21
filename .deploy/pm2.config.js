module.exports = {
  apps: [
    {
      name: 'rp-server',
      script: 'ts-node',
      args: ['--project', './tsconfig.json', 'server/index.ts']
    },
    {
      name: 'rp-storybook',
      script: 'npm',
      args: ['run', 'storybook']
    }
  ]
}
