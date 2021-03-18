import execa from 'execa';
import { getUserFiles } from './user-files';
import { info } from './utils/log';

const { projectRoot } = getUserFiles();

const defaultConfig = {
	project: projectRoot,
	declaration: true,
	declarationDir: 'dist/types',
	declarationMap: true,
	emitDeclarationOnly: false,
	noEmit: false,
};

const tsc = (opts: Record<string, unknown>) =>
	execa(
		'tsc',
		Object.entries({ ...defaultConfig, ...opts }).flatMap(([opt, val]) => [
			`--${opt}`,
			String(val),
		]),
	);

export const compile = () => {
	info('Compiling source code');

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
