import type { PackageJson } from 'type-fest';
import { sortPackage } from './sort-package';
import { getUserFiles } from './utils/user-files';

export const lintPackage = async () => {
	const { pkg } = getUserFiles();

	if (
		pkg.dependencies &&
		Object.keys(pkg.dependencies).some((dep) =>
			dep.startsWith('@guardian/'),
		)
	) {
		throw new Error(
			'@guardian packages can not be declared as dependencies. Use peerDependencies instead.',
		);
	}

	const requiredFields: Array<Partial<keyof PackageJson>> = [
		'main',
		'module',
		'types',
	];

	requiredFields.forEach((requiredField: Partial<keyof PackageJson>) => {
		if (!pkg[requiredField]) {
			throw new Error(
				`The '${requiredField}' field is missing from your package.json.`,
			);
		}
	});

	await sortPackage();
};
