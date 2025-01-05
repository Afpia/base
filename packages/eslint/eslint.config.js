import pluginReact from 'eslint-plugin-react'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

import antfu from '@antfu/eslint-config'
import pluginNext from '@next/eslint-plugin-next'

/** @type {import('@afpia/eslint').Eslint} */
export const eslint = ({ ...options }, ...configs) => {
	if (options.jsxA11y) {
		configs.unshift({
			name: '@afpia/jsx-a11y',
			plugins: { 'jsx-a11y': pluginJsxA11y },
			rules: {
				...pluginJsxA11y.flatConfigs.recommended.rules
			}
		})
	}

	if (options.next) {
		configs.unshift({
			name: '@afpia/next',
			plugins: {
				'@next/next': pluginNext
			},
			rules: {
				...pluginNext.configs.recommended.rules
			}
		})
	}

	if (options.react) {
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

	return antfu(
		{
			name: '@afpia/stylistic',
			rules: {
				'style/indent': 'off',
				'style/no-tabs': 'off',
				'style/operator-linebreak': 'off',
				'style/member-delimiter-style': [
					'error',
					{
						multiline: {
							delimiter: 'none',
							requireLast: false
						},
						singleline: {
							delimiter: 'semi',
							requireLast: false
						}
					}
				],
				'style/quote-props': ['error', 'as-needed'],
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
				'antfu/if-newline': 'off',
				'no-shadow': 'error',
				'no-console': 'warn',
				'no-warning-comments': ['warn', { terms: ['todo', 'fixme', 'mb', 'note'], location: 'anywhere' }],
				'no-inline-comments': 'error',
				'prefer-arrow-callback': 'warn',
				'arrow-body-style': ['warn', 'as-needed']
			}
		},
		{
			name: '@afpia/perfectionist',
			rules: {
				'perfectionist/sort-interfaces': [
					'error',
					{
						groups: ['unknown', 'method', 'multiline'],
						order: 'asc',
						type: 'alphabetical'
					}
				],
				'perfectionist/sort-jsx-props': [
					'error',
					{
						customGroups: {
							callback: 'on*'
						},
						groups: ['unknown', 'shorthand', 'multiline', 'callback'],
						order: 'asc',
						type: 'alphabetical'
					}
				],
				'perfectionist/sort-union-types': [
					'error',
					{
						groups: [
							'conditional',
							'function',
							'import',
							'intersection',
							'keyword',
							'literal',
							'named',
							'object',
							'operator',
							'tuple',
							'union',
							'nullish'
						],
						order: 'asc',
						specialCharacters: 'keep',
						type: 'alphabetical'
					}
				]
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
							['^node:', '^react', '^(.*react.*)$', '^'],
							// Internal packages
							['^(?!@(utils|assets|shared|widgets|entities|pages|features|app|ui|api)(/.*|$)).*@'],
							// Alias imports
							['^(@utils|@assets|@shared|@widgets|@entities|@pages|@features|@app|@ui|@api)(/.*)$'],
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
