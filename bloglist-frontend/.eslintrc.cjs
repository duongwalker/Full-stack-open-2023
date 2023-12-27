module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        "cypress/globals": true
    },
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': '2023',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
        },
    },
    'plugins': [
        'react', 'jest', 'cypress'
    ],
    'rules': {
        'indent': [
            'error',
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    },
}
