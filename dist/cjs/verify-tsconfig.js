"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTsConfig = void 0;
const user_files_1 = require("./user-files");
const log_1 = require("./utils/log");
const verifyTsConfig = () => {
    const { tsConfig } = user_files_1.getUserFiles();
    const { compilerOptions } = tsConfig;
    if (compilerOptions) {
        const unneededFields = [
            'module',
            'target',
            'outDir',
            'emitDeclarationOnly',
            'declaration',
            'declarationMap',
            'declarationDir',
        ];
        const presentButUnneededFields = unneededFields.filter((_) => Boolean(compilerOptions[_]));
        if (presentButUnneededFields.length) {
            log_1.warn(`\nThe following compilerOptions are not needed in your tsconfig.json:\n  - ${presentButUnneededFields.join('\n  - ')}`);
        }
    }
};
exports.verifyTsConfig = verifyTsConfig;
