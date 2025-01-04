/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
	plugins: ['stylelint-order'],
	rules: {
		'order/order': ['dollar-variables', 'custom-properties', 'declarations', 'at-rules', 'rules'],

		'no-empty-source': null,
		'color-hex-length': 'short',
		'font-weight-notation': 'numeric',
		'color-named': 'never',

		'selector-no-qualifying-type': [
			true,
			{
				ignore: ['attribute', 'class']
			}
		],

		'declaration-no-important': true,
		'keyframe-declaration-no-important': true,

		'media-feature-range-notation': 'prefix',

		'selector-class-pattern': [
			'^[a-z0-9]+(?:__[a-z0-9]+)?(?:--[a-z0-9]+)?$',
			{
				message: 'Selector should be written in BEM (block__element--modifier) format'
			}
		],

		'keyframes-name-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected keyframe name to be kebab-case'
			}
		],

		'scss/percent-placeholder-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected pattern for %-placeholders to be kebab-case'
			}
		],

		'scss/at-mixin-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected pattern for mixin to be kebab-case'
			}
		]
	}
}
