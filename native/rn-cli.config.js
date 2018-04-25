/* eslint-disable import/no-extraneous-dependencies */
const blacklist = require('metro/src/blacklist')

const config = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx']
  },
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
}
module.exports = config
