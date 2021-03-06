module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/recommended'
	],
	ecmaFeatures:  {
		jsx: true
	},
	parser: 'vue-eslint-parser',
	rules: {
		'vue/prop-name-casing': ["error", "snake_case"],
		indent: ['error', 'tab'],
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				mocha: true
			}
		}
	]
}
