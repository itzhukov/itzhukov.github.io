var webpack = require('webpack');
var path = require('path');
var config = {
	cache: true,
	entry: [
		'babel-polyfill',
		'./assets/js/main.js'
	],
	target: 'web',
	watchOptions: {
		poll: true,
		aggregateTimeout: 30
	},
	output: {
		path: path.join(__dirname, 'public/js/'),
		filename: 'build.js',
		chunkFilename: '[chunkhash].bundle.js'
	},
	resolve: {
		unsafeCache: true,
		extensions: ['', '.js', '.jsx'],
		root: [
			path.resolve(__dirname, 'assets/js/'),
		],
		alias: {
			'module1': 'modules/module1'
		}
	},
	noParse: [
		/\.min\.js/,
		/(node_modules|bower_components)/
	],
	module: {
		loaders: [
			{
				exclude: [
					/(node_modules|bower_components)/,
					/\.min\.js/
				],
				test: /\.(js|jsx)$/,
				loader: 'babel',
				include: [
					path.resolve(__dirname, 'assets/js/')
				],
				plugins: [
					'transform-react-inline-elements',
					'transform-react-constant-elements',
					'transform-runtime',
					'syntax-object-rest-spread'
				],
				query: {
					cacheDirectory: true,
					presets: ["es2015", "stage-0", "react"]
				}
			}
		],
	},
	posthtml: function () {
		return {
			defaults: [ PostHTML ]
		}
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
		new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]
}

config.devtool = 'eval';
config.stats = {
	colors: true,
	reasons: false
};

config.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		minimize: true,
		sourceMap: false,
		comments: false,
		compressor: {
			pure_getters: true,
			unsafe: true,
			unsafe_comps: true,
			warnings: false
		}
	})
)

module.exports = config;
