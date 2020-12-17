module.exports = require('haoma').getCompileConfig({
  name: 'cjs',
  inputFiles: ['src/**/*.ts', '!**/*.test.*', '!**/__*'],
  target: 'node',
  module: 'cjs',
  outDir: 'lib',
  clean: true,
})
