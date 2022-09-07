const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    return {
        mode: env.NODE_ENV ? 'production' : 'development',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: "/"
        },
        resolve: {
            extensions: [".ts", ".tsx", '.js', 'jsx'],
            plugins: [new DirectoryNamedWebpackPlugin()],
            alias: {
                process: 'process/browser',
            }
        },
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    resolve: {
                        extensions: ['.ts', '.tsx', '.js', '.json'],
                    },
                    use: 'ts-loader',
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                        },
                    ],
                },
                {
                    test: /\.json$/,
                    loader: "json-loader",
                    options: {
                        name: '/public/[name].[ext]'
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '/public/icons/[name].[ext]'
                    }
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
        },
        devtool: env.NODE_ENV ? undefined : 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                filename: "index.html",
            }),
            new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
            new MiniCssExtractPlugin(),
            new Dotenv({
                path: './.env',
                systemvars: true,
            })
        ]
    }
};