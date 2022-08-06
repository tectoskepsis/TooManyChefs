var webpack = require('webpack');

module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    },
    plugins: [
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
    ]
};