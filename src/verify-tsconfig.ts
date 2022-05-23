import fs from 'fs';
import { format } from 'prettier';
import sortKeys from 'sort-keys';
import { config } from './utils/config';
import { getUserFiles } from './utils/user-files';

export const verifyTsconfig = () => {
	const { tsConfig } = getUserFiles();
	const { compilerOptions } = tsConfig;

	if (compilerOptions) {
		delete compilerOptions.emitDeclarationOnly;
		delete compilerOptions.declaration;
		delete compilerOptions.declarationMap;
		delete compilerOptions.declarationDir;
		delete compilerOptions.lib;

		compilerOptions.noEmit = true;
		compilerOptions.module = config.esm.module;
		compilerOptions.target = config.esm.target;

		const fixedOptions = sortKeys(compilerOptions);

		fs.writeFileSync(
			'tsconfig.json',
			format(
				JSON.stringify({ ...tsConfig, compilerOptions: fixedOptions }),
				{
					parser: 'json',
				},
			),
		);
	}
};
