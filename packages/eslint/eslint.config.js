import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

import antfu from '@antfu/eslint-config'

/** @type {import('@afpia/eslint').Eslint} */
export const eslint = ({ jsxA11y = false, react = false, ...options }, ...configs) => {
	if (jsxA11y) {
		configs.unshift({
			name: '@afpia/jsx-a11y',
			plugins: { 'jsx-a11y': pluginJsxA11y },
			rules: {
				...pluginJsxA11y.configs.recommended
			}
		})
	}

	if (react) {
		configs.unshift({
			name: '@afpia/react',
			settings: {
				react: {
					version: 'detect'
				}
			},
			plugins: { react: pluginReact },
			rules: {
				...pluginReact.configs.flat.recommended.rules,
				'react/button-has-type': 'warn',
				'react/prop-types': 'off',
				'react/no-array-index-key': 'warn',
				'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
				'react/jsx-no-target-blank': 'off',
				'react/react-in-jsx-scope': 'off',
				'react/function-component-definition': [
					'error',
					{
						namedComponents: ['arrow-function'],
						unnamedComponents: 'arrow-function'
					}
				]
			}
		})
	}

	if (options.typescript) {
		configs.unshift({
			name: '@afpia/typescript',
			rules: {
				'ts/consistent-type-imports': [
					'error',
					{
						disallowTypeAnnotations: false,
						prefer: 'type-imports',
						fixStyle: 'inline-type-imports'
					}
				]
			}
		})
	}

	return antfu(
		{ ...options },
		{
			name: '@afpia/stylistic',
			rules: {
				'style/indent': 'off',
				'style/no-tabs': 'off',
				'style/brace-style': 'off',
				'style/comma-dangle': ['error', 'never'],
				'style/jsx-quotes': ['error', 'prefer-single'],
				'style/arrow-parens': ['error', 'always'],
				'style/jsx-indent-props': [2, 'tab'],
				'style/jsx-wrap-multilines': ['error', { declaration: 'parens' }],
				'jsonc/indent': ['error', 'tab'],
				'style/indent-binary-ops': ['error', 'tab']
			}
		},
		{
			ignores: [
				'**/node_modules/**',
				'**/dist/**',
				'prettier.config.js',
				'tailwind.config.js',
				'commitlint.config.js',
				'stylelint.config.js',
				'eslint.config.js'
			]
		},
		{
			name: '@afpia/rewrite',
			rules: {
				'antfu/top-level-function': 'off',
				'no-shadow': 'error',
				'no-console': 'warn',
				'no-warning-comments': ['warn', { terms: ['todo', 'fixme', 'mb', 'note'], location: 'anywhere' }],
				'no-inline-comments': 'error',
				'prefer-arrow-callback': 'warn',
				'arrow-body-style': ['warn', 'as-needed']
			}
		},
		{
			name: '@afpia/simple-import-sort',
			plugins: {
				'simple-import-sort': pluginSimpleImportSort
			},
			rules: {
				'perfectionist/sort-imports': 'off',
				'perfectionist/sort-named-imports': 'off',
				'import/no-default-export': 'warn',
				'import/newline-after-import': 'warn',
				'simple-import-sort/exports': 'error',
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// External packages
							['^react', '^@?\\w'],
							// Internal packages
							['^@(\\w+/)?\\w+/.*$'],
							// Alias imports
							['^@((\\w|_)?\\w)\\/assets|test-utils'],
							// Side effect imports
							['^\\u0000'],
							// Parent imports
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports
							['^.+\\.s?css$']
						]
					}
				]
			}
		},
		...configs
	)
}
