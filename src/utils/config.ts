import type { TsConfigJson } from 'type-fest';

type Config = Record<
	string,
	{
		module: TsConfigJson.CompilerOptions.Module;
		target: TsConfigJson.CompilerOptions.Target;
	}
>;

export const config: Config = {
	cjs: {
		module: 'commonjs',
		target: 'ES2018',
	},
	esm: {
		module: 'ESNext',
		target: 'ES2020',
	},
};
