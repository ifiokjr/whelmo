module.exports = {
  extends: ['@commitlint/config-lerna-scopes'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'FEAT',
        'FEATURE',
        'FIX',
        'DOCS',
        'STYLE',
        'REFACTOR',
        'TEST',
        'REVERT',
        'AMEND',
        'WIP',
        'DESIGN',
        'CHORE',
        'BUILD',
      ],
    ],
    'type-case': [2, 'always', 'upper-case'],
  },
}
