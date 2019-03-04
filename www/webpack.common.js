const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        demo: './bootstrap.demo.js',
        benchmark: './bootstrap.benchmark.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bootstrap.[name].bundle.js',
    },
    module: {
        noParse: [
            /benchmark\/benchmark\.js/,
        ],
    },
    plugins: [
        new CopyWebpackPlugin(['index.html']),
        new CopyWebpackPlugin(['benchmark.html']),
    ],
};
