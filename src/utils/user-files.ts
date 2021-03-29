import path from 'path';
import pkgDir from 'pkg-dir';
import type { PackageJson, TsConfigJson } from 'type-fest';

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
		throw new Error('Cannot find package.json');
	}

	pkg ||= require(path.resolve(projectRoot, 'package.json')) as PackageJson;

	try {
		tsConfig ||= require(path.resolve(
			projectRoot,
			'tsconfig.json',
		)) as TsConfigJson;
	} catch (e) {
		throw new Error('Cannot find tsconfig.json');
	}

	return { pkg, projectRoot, tsConfig };
};
