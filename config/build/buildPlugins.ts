import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ProgressPlugin, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

export function buildPlugins({
    paths, isDev, apiUrl, project,
}:BuildOptions) {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new BundleAnalyzerPlugin(
            { analyzerMode: process.env.STATS as 'server' || 'disabled' },
        ),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin(), new HotModuleReplacementPlugin());
    }

    return plugins;
}
