import readPkgUp from 'read-pkg-up';
import type { PackageJson } from 'type-fest';

const packageResult = readPkgUp.sync({
	cwd: __dirname,
	normalize: false,
});

// this is mainly to keep TS happy that we can rely on the result.
// a world in which is actually throws is one i don't want to be part of.
if (!packageResult) throw new Error("Can't find my own package.json!");

export const pkg = packageResult.packageJson as PackageJson;
