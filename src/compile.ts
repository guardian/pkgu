import execa from 'execa';
import { info } from './utils/log';
import { getUserFiles } from './utils/user-files';

const { projectRoot } = getUserFiles();

const defaultConfig = {
	project: projectRoot,
	declaration: true,
	declarationDir: 'dist/types',
	declarationMap: true,
	emitDeclarationOnly: false,
	noEmit: false,
};

const optsToArgs = (opts: Record<string, unknown>) =>
	Object.entries({ ...defaultConfig, ...opts }).flatMap(([opt, val]) => [
		`--${opt}`,
		String(val),
	]);

const tsc = (opts: Record<string, unknown>) => execa('tsc', optsToArgs(opts));

export const compile = () => {
	// info('Compiling source code');

	return Promise.all([
		tsc({
			module: 'ES2020',
			target: 'ES2020',
			outDir: 'dist/esm',
		}),
		tsc({
			module: 'commonjs',
			target: 'ES2018',
			outDir: 'dist/cjs',

			// no point building these again
			declaration: false,
			declarationDir: null,
			declarationMap: false,
		}),
	]);
};
