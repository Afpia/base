/** @type {import('prettier').Config} */
export default {
	useTabs: true,
	trailingComma: 'none',
	jsxSingleQuote: true,
	singleQuote: true,
	tabWidth: 2,
	semi: false,
	arrowParens: 'always',
	printWidth: 130,
	importOrder: [
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
	],
	plugins: ['@ianvs/prettier-plugin-sort-imports']
}
