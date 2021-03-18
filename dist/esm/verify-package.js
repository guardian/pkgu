// @guardian packages are peerDeps
// main/modules/types exist
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pathExists from 'path-exists';
import { sortPackage } from './sort-package';
import { getUserFiles } from './user-files';
import { error, info } from './utils/log';
export const verifyPackage = () => __awaiter(void 0, void 0, void 0, function* () {
    info('Verifying package.json');
    const { pkg } = getUserFiles();
    if (pkg.dependencies &&
        Object.keys(pkg.dependencies).some((dep) => dep.startsWith('@guardian/'))) {
        error('@guardian packages should only be declared as peerDependencies');
        process.exit(1);
    }
    const requiredFields = [
        'main',
        'module',
        'types',
    ];
    requiredFields.forEach((requiredField) => {
        if (!pkg[requiredField]) {
            error(`${requiredField} field is missing from your package.json`);
            process.exit(1);
        }
        const filePath = pkg[requiredField];
        if (!pathExists.sync(filePath)) {
            error(`${requiredField} field points to ${filePath} but it does not exist`);
            process.exit(1);
        }
    });
    yield sortPackage();
});
