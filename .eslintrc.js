module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		amd: true,
		node: true,
		jest: true,
		es6: true
	},
	plugins: ['react'],
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	rules: {
		// overrides
	}
};
