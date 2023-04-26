import path from 'path';
import { Configuration } from 'webpack';
import { BuildPaths, buildWebpackConfigs, BuildEnv } from './config/build';

export default (env:BuildEnv) => {
    const paths:BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        build: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';

    const isDev = mode === 'development';
    const PORT = env.port || 3003;
    const apiUrl = env.apiUrl || 'http://localhost:8000';

    const config:Configuration = buildWebpackConfigs({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    });

    return config;
};
