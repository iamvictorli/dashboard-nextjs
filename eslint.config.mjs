import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  formatters: true,
  react: true,
  ignores: [
    'db/migrations/**/*',
    'next-env.d.ts',
  ],
}, ...tailwind.configs['flat/recommended'], jsxA11y.flatConfigs.recommended, {
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
  },
}, {
  rules: {
    'perfectionist/sort-imports': ['error', {
      internalPattern: ['@/**'],
    }],
  },
})
