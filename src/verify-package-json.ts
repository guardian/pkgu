import fs from 'fs';
import sortPackageJson from 'sort-package-json';
import { getUserFiles } from './utils/user-files';

export const verifyPackageJson = () => {
	const { pkg } = getUserFiles();

	if (
		pkg.dependencies &&
		Object.keys(pkg.dependencies).some((dep) =>
			dep.startsWith('@guardian/'),
		)
	) {
		throw new Error(
			'@guardian packages should not be declared as dependencies. Use peerDependencies instead.',
		);
	}

	pkg.main = 'dist/cjs/index.js';
	pkg.module = 'dist/esm/index.js';
	pkg.types = 'dist/types/index.d.ts';
	pkg.files = ['dist', ...(pkg.files ?? [])];

	// @ts-expect-error -- shouldn't be there
	delete pkg.unpkg;

	// @ts-expect-error -- shouldn't be there
	delete pkg.source;

	fs.writeFileSync(
		'package.json',
		JSON.stringify(sortPackageJson(pkg), null, 2) + '\n',
	);
};
