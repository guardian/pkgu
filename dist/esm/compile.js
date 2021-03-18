import execa from 'execa';
import { getUserFiles } from './user-files';
import { info } from './utils/log';
const { projectRoot } = getUserFiles();
const tsc = (opts) => execa('tsc', [
    '--project',
    projectRoot,
    '--noEmit',
    'false',
    '--emitDeclarationOnly',
    'false',
    ...Object.entries(opts).flatMap(([opt, val]) => [
        `--${opt}`,
        String(val),
    ]),
]);
export const compile = () => {
    info('Compiling source code');
    return Promise.all([
        tsc({
            module: 'commonjs',
            target: 'ES2018',
            outDir: 'dist/cjs',
            // make sure we override everything that
            // could have been set in the project config
            declaration: false,
            declarationDir: null,
            declarationMap: false,
        }),
        tsc({
            module: 'ES2020',
            target: 'ES2015',
            outDir: 'dist/esm',
            declaration: true,
            declarationDir: 'dist/types',
            declarationMap: true,
        }),
    ]);
};
