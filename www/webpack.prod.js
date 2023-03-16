const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'none',
    devtool: 'source-map',
    performance: {
        hints: 'warning'
    },
    output: {
        pathinfo: false
    },
    optimization: {
        nodeEnv: 'production',
        flagIncludedChunks: true,
        chunkIds: 'total-size',
        moduleIds: 'size',
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
        emitOnErrors: false,
        checkWasmTypes: true,
        minimize: false,
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
