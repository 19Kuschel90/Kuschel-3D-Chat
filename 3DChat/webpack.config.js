module.exports = {
    mode: 'development',
    entry: {
        SinglePage: "./App.jsx",
        Chat3D: "./chatApp.jsx"
    },
    output: {
        filename: "./public/js/[name].js"
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
    externals: ["GUserName"]
}