import execa from 'execa';
import { config } from './utils/config';
import { getUserFiles } from './utils/user-files';

const { projectRoot } = getUserFiles();

const optsToArgs = (opts: Record<string, unknown>) =>
	Object.entries(opts).flatMap(([opt, val]) => [`--${opt}`, String(val)]);

const tsc = (opts: Record<string, unknown>) => execa('tsc', optsToArgs(opts));

export const compile = () =>
	Promise.all([
		tsc({
			...config.esm,
			project: projectRoot,
			outDir: 'dist/esm',
			noEmit: false,
			declaration: true,
			declarationDir: 'dist/types',
			declarationMap: true,
			emitDeclarationOnly: false,
		}),
		tsc({
			...config.cjs,
			project: projectRoot,
			outDir: 'dist/cjs',
			noEmit: false,
			declaration: false,
			declarationDir: null,
			declarationMap: false,
			emitDeclarationOnly: null,
		}),
	]);
