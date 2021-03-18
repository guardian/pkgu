// @guardian packages are peerDeps
// main/modules/types exist

import pathExists from 'path-exists';
import type { PackageJson } from 'type-fest';
import { sortPackage } from './sort-package';
import { getUserFiles } from './user-files';
import { error, info } from './utils/log';

export const verifyPackage = async () => {
	info('Verifying package.json');

	const { pkg } = getUserFiles();

	if (
		pkg.dependencies &&
		Object.keys(pkg.dependencies).some((dep) =>
			dep.startsWith('@guardian/'),
		)
	) {
		error('@guardian packages should only be declared as peerDependencies');
		process.exit(1);
	}

	const requiredFields: Array<Partial<keyof PackageJson>> = [
		'main',
		'module',
		'types',
	];

	requiredFields.forEach((requiredField: Partial<keyof PackageJson>) => {
		if (!pkg[requiredField]) {
			error(`${requiredField} field is missing from your package.json`);
			process.exit(1);
		}
		const filePath = pkg[requiredField] as string;
		if (!pathExists.sync(filePath)) {
			error(
				`${requiredField} field points to ${filePath} but it does not exist`,
			);
			process.exit(1);
		}
	});

	await sortPackage();
};
