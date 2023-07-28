module.exports = {
  apps: [{
    name: 'react-production',
    script: 'ts-node',
    args: ['--project', './tsconfig.json', 'server/index.ts']
  }]
}
