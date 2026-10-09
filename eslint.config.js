import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

// 只检查 .js/.jsx：.ts/.tsx 由 `tsc -b` 负责
// （typescript-eslint 暂不支持 TypeScript 7，等它支持后再接入）
export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // 旧代码里有不少未使用的变量，先降为警告；React 17+ 的 JSX 转换不需要 import React
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    },
  },
]
