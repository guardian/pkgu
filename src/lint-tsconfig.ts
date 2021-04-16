import fs from 'fs';
import prettier from 'prettier';
import { config } from './utils/config';
import { getUserFiles } from './utils/user-files';

export const lintTsConfig = () => {
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

		fs.writeFileSync(
			'tsconfig.json',
			prettier.format(JSON.stringify({ ...tsConfig, compilerOptions }), {
				parser: 'json',
			}),
		);
	}
};
