import path from 'path';
import execa from 'execa';
import { getUserFiles } from './user-files';
import { error, info } from './utils/log';

const { pkg, projectRoot } = getUserFiles();

const makeExecutable = (binPath: string) => {
	return execa('chmod', ['+x', path.resolve(projectRoot, binPath)]);
};

export const makeBinExecutable = async (): Promise<void> => {
	const { bin } = pkg;

	if (bin) {
		info(`Making bin files executable`);
		try {
			if (typeof bin === 'string') {
				await makeExecutable(bin);
			} else {
				await Promise.all(
					Object.values(bin).map((binPath) =>
						makeExecutable(binPath),
					),
				);
			}
		} catch (e) {
			error(
				`Could not make ${JSON.stringify(
					bin,
				)} executable. Check the file(s) exist.`,
			);
			process.exit(1);
		}
	}
};
