import pathExists from 'path-exists';
import type { PackageJson } from 'type-fest';
import { getUserFiles } from './utils/user-files';

export const verifyPackage = () => {
	const { pkg } = getUserFiles();

	const fields: Array<Partial<keyof PackageJson>> = [
		'main',
		'module',
		'types',
	];

	fields.forEach((field: Partial<keyof PackageJson>) => {
		const filePath = pkg[field] as string;
		if (!pathExists.sync(filePath)) {
			throw new Error(
				`The '${field}' field points to ${filePath} but it does not exist.`,
			);
		}
	});
};
