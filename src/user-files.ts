import path from 'path';
import pkgDir from 'pkg-dir';
import type { PackageJson, TsConfigJson } from 'type-fest';
import { error } from './utils/log';

let projectRoot: string | undefined;
let pkg: PackageJson | undefined;
let tsConfig: TsConfigJson | undefined;

export const getUserFiles = (): {
	pkg: PackageJson;
	projectRoot: string;
	tsConfig: TsConfigJson;
} => {
	projectRoot ||= pkgDir.sync();

	if (!projectRoot) {
		error('Cannot find package.json');
		process.exit(1);
	}

	pkg ||= require(path.resolve(projectRoot, 'package.json')) as PackageJson;

	try {
		tsConfig ||= require(path.resolve(
			projectRoot,
			'tsconfig.json',
		)) as TsConfigJson;
	} catch (e) {
		error('Cannot find tsconfig.json');
		process.exit(1);
	}

	return { pkg, projectRoot, tsConfig };
};
