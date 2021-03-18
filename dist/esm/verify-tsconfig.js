import { getUserFiles } from './user-files';
import { warn } from './utils/log';
export const verifyTsConfig = () => {
    const { tsConfig } = getUserFiles();
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
            warn(`\nThe following compilerOptions are not needed in your tsconfig.json:\n  - ${presentButUnneededFields.join('\n  - ')}`);
        }
    }
};
