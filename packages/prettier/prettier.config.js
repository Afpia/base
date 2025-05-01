/**
 * @param {{ sortImports?: boolean, extraPlugins?: string[] }}
 * @returns {import('prettier').Config}
 */

export const prettier = ({ sortImports = false, extraPlugins = [] }) => {
	const plugins = [...(sortImports ? ['@ianvs/prettier-plugin-sort-imports'] : []), ...extraPlugins]

	return {
		useTabs: true,
		trailingComma: 'none',
		jsxSingleQuote: true,
		singleQuote: true,
		tabWidth: 2,
		semi: false,
		arrowParens: 'always',
		printWidth: 130,
		plugins: plugins,
		importOrder: sortImports
			? [
					'<BUILTIN_MODULES>',
					'^react$',
					'^(.*react.*)$',
					'<THIRD_PARTY_MODULES>',
					'',
					'^(?!@(utils|assets|shared|widgets|entities|pages|features|app|ui|api)(/.*|$)).*@',
					'',
					'^(@utils|@assets|@shared|@widgets|@entities|@pages|@features|@app|@ui|@api)(/.*)$',
					'',
					'^\\.\\./.*$',
					'',
					'^(?!.*[.](css|scss)$)[./].*$',
					'',
					'.(css|scss)$'
				]
			: undefined
	}
}
