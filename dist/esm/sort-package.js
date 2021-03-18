import execa from 'execa';
import { getUserFiles } from './user-files';
export const sortPackage = () => execa('sort-package-json', { cwd: getUserFiles().projectRoot });
