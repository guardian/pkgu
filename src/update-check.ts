import latestVersion from 'latest-version';
import { pkg } from './utils/package-files';

export const updateCheck = async () => {
	const { name, version } = pkg;

	if (!name) throw new Error('Cannot find package name');

	const latest = await latestVersion(name);

	if (latest === version) {
		return true;
	}
	throw new Error(
		`Your version of ${String(name)} is out of date (${String(
			version,
		)} > ${latest}).`,
	);
};
