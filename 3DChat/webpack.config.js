module.exports = {
    mode: 'development',
    entry: "./App.jsx",
    output: {
        filename: "./public/js/SinglePage.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    externals: ["p5"]
}