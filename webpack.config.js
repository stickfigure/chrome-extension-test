const path = require('path');

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/app.tsx'),
		background: path.join(__dirname, 'src/background.ts')
	},
	output: {
		path: path.join(__dirname, 'distro/js'),
		filename: '[name].js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.tsx?$/, use: ['ts-loader'] },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },

			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		modules: [path.resolve(__dirname, './src'), 'node_modules']
	},
	plugins: [

	],
	optimization: {
	}
};
