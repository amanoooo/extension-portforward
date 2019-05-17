// webpack.config.js
const path = require('path');

module.exports = {
    entry: {
        background: './src/index.js',
        content: './src/content.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
                // test 符合此正则规则的文件，运用 loader 去进行处理，除了exclude 中指定的内容
            }
        ]
    },
    mode: 'development',
    watch: true
};