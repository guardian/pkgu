import fs from 'fs';
import prettier from 'prettier';
import { getUserFiles } from './utils/user-files';

export const lintTsConfig = () => {
	const { tsConfig } = getUserFiles();
	const { compilerOptions } = tsConfig;

	if (compilerOptions) {
		compilerOptions.noEmit = true;

		delete compilerOptions.emitDeclarationOnly;
		delete compilerOptions.declaration;
		delete compilerOptions.declarationMap;
		delete compilerOptions.declarationDir;
		delete compilerOptions.module;
		delete compilerOptions.target;
		delete compilerOptions.lib;

		fs.writeFileSync(
			'tsconfig.json',
			prettier.format(JSON.stringify({ ...tsConfig, compilerOptions }), {
				parser: 'json',
			}),
		);
	}
};
