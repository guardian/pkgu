"use strict";
// @guardian packages are peerDeps
// main/modules/types exist
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPackage = void 0;
const path_exists_1 = __importDefault(require("path-exists"));
const sort_package_1 = require("./sort-package");
const user_files_1 = require("./user-files");
const log_1 = require("./utils/log");
const verifyPackage = async () => {
    log_1.info('Verifying package.json');
    const { pkg } = user_files_1.getUserFiles();
    if (pkg.dependencies &&
        Object.keys(pkg.dependencies).some((dep) => dep.startsWith('@guardian/'))) {
        log_1.error('@guardian packages should only be declared as peerDependencies');
        process.exit(1);
    }
    const requiredFields = [
        'main',
        'module',
        'types',
    ];
    requiredFields.forEach((requiredField) => {
        if (!pkg[requiredField]) {
            log_1.error(`${requiredField} field is missing from your package.json`);
            process.exit(1);
        }
        const filePath = pkg[requiredField];
        if (!path_exists_1.default.sync(filePath)) {
            log_1.error(`${requiredField} field points to ${filePath} but it does not exist`);
            process.exit(1);
        }
    });
    await sort_package_1.sortPackage();
};
exports.verifyPackage = verifyPackage;
