import latestVersion from 'latest-version';
import type { ListrContext, ListrTaskWrapper } from 'listr';
import { pkg } from './utils/package-files';

export const checkForUpdates = async (
	ctx: ListrContext,
	task: ListrTaskWrapper,
) => {
	const { name, version } = pkg;

	if (!name) throw new Error('Cannot find package name');

	try {
		const latest = await latestVersion(name);

		if (latest === version) {
			return true;
		}

		throw new Error(
			`Your version of ${String(name)} is out of date (${String(
				version,
			)} > ${latest}).`,
		);
	} catch (e) {
		void task.skip(`Could not find ${name} on NPM`);
	}
};
