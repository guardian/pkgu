import type { TsConfigJson } from 'type-fest';
import { warn } from './utils/log';
import { getUserFiles } from './utils/user-files';

export const lintTsConfig = () => {
	const { tsConfig } = getUserFiles();
	const { compilerOptions } = tsConfig;

	if (compilerOptions) {
		const unneededFields: Array<
			Partial<keyof TsConfigJson.CompilerOptions>
		> = [
			'module',
			'target',
			'outDir',
			'emitDeclarationOnly',
			'declaration',
			'declarationMap',
			'declarationDir',
		];

		const presentButUnneededFields = unneededFields.filter((_) =>
			Boolean(compilerOptions[_]),
		);

		if (presentButUnneededFields.length) {
			warn(
				`\nThe following compilerOptions are not needed in your tsconfig.json:\n  - ${presentButUnneededFields.join(
					'\n  - ',
				)}\n`,
			);
			process.exit();
		}
	}
};
