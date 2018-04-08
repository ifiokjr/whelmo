/* eslint-disable no-param-reassign */
const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.ttf$/,
    use: [{ loader: 'url-loader', options: { limit: 10000 } }], // or directly file-loader
    include: [path.resolve(__dirname, '../src')],
  })
  config.module.rules.push({
    test: /\.tsx?$/,
    include: [path.resolve(__dirname, '../src')],
    use: [
      require.resolve('ts-loader'),
      // require.resolve('react-docgen-typescript-loader'),
    ],
  })
  config.module.rules[0].exclude = []
  config.module.rules[0].query.presets.unshift('react-native')
  // console.log(config.module.rules[0])
  config.module.rules[0].include.push(
    /node_modules\/react-native-/,
    // path.resolve(__dirname, '../node_modules/react-native-linear-gradient'),
    // path.resolve(__dirname, '../node_modules/react-native-web-linear-gradient'),
    path.resolve(
      __dirname,
      '../../../node_modules/react-native-web-linear-gradient',
    ),
    path.resolve(__dirname, '../../../node_modules/react-native-vector-icons'),
    // path.resolve(__dirname, '../../../node_modules/react-native-responsive'),
    // path.resolve(__dirname, '../node_modules/react-native-responsive'),
  )
  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias['react-native'] = 'react-native-web'
  config.resolve.alias['react-native-linear-gradient'] =
    'react-native-web-linear-gradient'

  // Object.assign(config.output, {
  //   publicPath: 'http://localhost:6006/',
  // })
  return config
}
