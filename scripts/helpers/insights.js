const Insight = require('insight')
const colors = require('colors')
const pkg = require('../../package.json')
const debug = require('debug')('script:helper:insights')

/**
 * Create the insights object for tracking usage of this monorepo
 */
const insight = new Insight({
  trackingCode: 'UA-117152891-2',
  pkg,
})

exports.insight = insight

exports.askPermission = () =>
  new Promise(resolve => {
    if (insight.optOut === undefined) {
      debug('Asking for permission')
      insight.askPermission(
        `May ${colors.cyan.bold(
          pkg.name,
        )} anonymously report usage statistics to improve the tool over time?`,
        () => {
          debug(
            insight.optOut ? 'The user has opted out' : 'The user has opted in',
          )
          insight.track('install', 'first-time')
          resolve()
        },
      )
    } else {
      debug('Permission has already been asked for.')
      resolve()
    }
  })

/**
 * Tracks whether the user is running installations with NPM or YARN
 */
exports.trackInstallAgent = () => {
  const installAgent = process.env.npm_config_user_agent
  let version
  try {
    const [, val] = installAgent.split(' ')[0].split('/')
    version = val
  } catch (e) {
    debug('#trackInstallAgent - version could not be obtained')
  }
  if (installAgent && installAgent.includes('yarn')) {
    insight.track('postinstall', 'yarn', version)
  } else {
    insight.track('postinstall', 'npm', version)
  }
}
