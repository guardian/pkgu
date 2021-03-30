import execa from 'execa';
import { getUserFiles } from './utils/user-files';

const { projectRoot } = getUserFiles();

const optsToArgs = (opts: Record<string, unknown>) =>
	Object.entries(opts).flatMap(([opt, val]) => [`--${opt}`, String(val)]);

const tsc = (opts: Record<string, unknown>) => execa('tsc', optsToArgs(opts));

export const compile = () =>
	Promise.all([
		tsc({
			project: projectRoot,
			module: 'ES2020',
			target: 'ES2020',
			outDir: 'dist/esm',
			noEmit: false,
			declaration: true,
			declarationDir: 'dist/types',
			declarationMap: true,
			emitDeclarationOnly: false,
		}),
		tsc({
			project: projectRoot,
			module: 'commonjs',
			target: 'ES2018', // Node 10
			outDir: 'dist/cjs',
			noEmit: false,
			declaration: false,
			declarationDir: null,
			declarationMap: false,
			emitDeclarationOnly: null,
		}),
	]);
