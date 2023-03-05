import { BuildOptions } from "./types/config";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";

export default ({ isDev }: BuildOptions): RuleSetRule[] => {
  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCSSExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resolvePath: string) => resolvePath.includes(".module."),
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
        },
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  // if we use ts-loader we already don't need to use babel
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  return [fileLoader, svgLoader, typescriptLoader, cssLoader];
};
