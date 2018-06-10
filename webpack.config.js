const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const config = {
    mode: 'development',
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        modules: [path.join(__dirname, 'src'), "node_modules"],
        alias: {
            'vue$' : 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.css$/,
                use: 'css-loader',

            },
            {
                test: '/\.js$/',
                use: 'babel-loader'
            },
            {
                test: '/\.(png|gif|jpg)$/',
                use:
                    [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
            },
            {
                test: '/\.(png|gif|jpg)$/',
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]

            }
        ]
    },
    devServer: {
        stats:'errors-only',
        host : process.env.HOST,
        port : process.env.PORT,
        open : true
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            inject: true
        }),
        new VueLoaderPlugin()
    ]


}

module.exports = config;