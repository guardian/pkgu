import path from 'path';
import execa from 'execa';
import { getUserFiles } from './utils/user-files';

const { pkg, projectRoot } = getUserFiles();

const makeExecutable = (binPath: string) => {
	return execa('chmod', ['+x', path.resolve(projectRoot, binPath)]);
};

export const makeBinExecutable = async (): Promise<void> => {
	const { bin } = pkg;

	if (bin) {
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
			throw new Error(
				`Could not make ${JSON.stringify(
					bin,
				)} executable. Check the file(s) exist.`,
			);
		}
	}
};
