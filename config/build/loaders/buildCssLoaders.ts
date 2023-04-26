const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export function buildCssLoaders(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resourcePath:string) => resourcePath.includes('.module.'),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                        exportLocalsConvention: 'camelCase',
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
}
