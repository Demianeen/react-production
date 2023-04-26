import webpack from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoaders } from './loaders/buildBabelLoaders';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { BuildOptions } from './types/config';

export function buildLoaders(options:BuildOptions):webpack.RuleSetRule[] {
    const { isDev } = options;
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const babelLoader = buildBabelLoaders(options);

    const scssLoaders = buildCssLoaders(isDev);

    const typescriptLoaders = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: require.resolve('ts-loader'),
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: isDev,
                },
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoaders,
        scssLoaders,
    ];
}
