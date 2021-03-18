import path from 'path';
import pkgDir from 'pkg-dir';
import { error } from './utils/log';
let projectRoot;
let pkg;
let tsConfig;
export const getUserFiles = () => {
    projectRoot || (projectRoot = pkgDir.sync());
    if (!projectRoot) {
        error('Cannot find package.json');
        process.exit(1);
    }
    pkg || (pkg = require(path.resolve(projectRoot, 'package.json')));
    try {
        tsConfig || (tsConfig = require(path.resolve(projectRoot, 'tsconfig.json')));
    }
    catch (e) {
        error('Cannot find tsconfig.json');
        process.exit(1);
    }
    return { pkg, projectRoot, tsConfig };
};
