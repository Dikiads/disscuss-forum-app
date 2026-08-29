module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'dicodingacademy',
        'plugin:react/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 'warn'
    }
}
