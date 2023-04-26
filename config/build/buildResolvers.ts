import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options:BuildOptions):webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    };
}

/*

Что бы сделать alias через '@', что бы импортить как
import {classNames} from "@/shared/lib/classNames/classNames";
Нужно в buildResolvers добавить alias: {'@': options.paths.src},
а в tsconfig поменять path таким образом: "paths": {"@/*": ["./src/*"]},
*/
