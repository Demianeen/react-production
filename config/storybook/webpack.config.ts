import { WebpackConfiguration } from 'webpack-dev-server';
import path from 'path';
import { DefinePlugin, RuleSetRule } from 'webpack';
import { BuildPaths } from '../build';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';

export default ({ config }: {config: WebpackConfiguration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    // config.resolve?.modules?.push(paths.src);
    config!.resolve!.modules = [paths.src, 'node_modules'];
    config!.resolve!.extensions!.push('.ts', '.tsx');

    // eslint-disable-next-line no-param-reassign
    const rules = config.module!.rules as RuleSetRule[];
    config!.module!.rules = rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });
    // if (config.module?.rules) {
    //     let { rules } = config.module;

    //     rules = rules.map((rule: RuleSetRule | '...') => {
    //         if (rule !== '...' && /svg/.test(rule.test as string)) {
    //             return { ...rule, exclude: /\.svg$/i };
    //         }

    //         return rule;
    //     });
    // }

    config!.module!.rules!.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config!.module!.rules!.push(buildCssLoaders(true));

    config!.plugins!.push(new DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
