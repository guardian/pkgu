var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import execa from 'execa';
import { getUserFiles } from './user-files';
import { error, info } from './utils/log';
const { pkg, projectRoot } = getUserFiles();
const makeExecutable = (binPath) => {
    return execa('chmod', ['+x', path.resolve(projectRoot, binPath)]);
};
export const makeBinExecutable = () => __awaiter(void 0, void 0, void 0, function* () {
    const { bin } = pkg;
    if (bin) {
        info(`Making bin files executable`);
        try {
            if (typeof bin === 'string') {
                yield makeExecutable(bin);
            }
            else {
                yield Promise.all(Object.values(bin).map((binPath) => makeExecutable(binPath)));
            }
        }
        catch (e) {
            error(`Could not make ${JSON.stringify(bin)} executable. Check the file(s) exist.`);
            process.exit(1);
        }
    }
});
