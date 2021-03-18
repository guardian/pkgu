"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBinExecutable = void 0;
const path_1 = __importDefault(require("path"));
const execa_1 = __importDefault(require("execa"));
const user_files_1 = require("./user-files");
const log_1 = require("./utils/log");
const { pkg, projectRoot } = user_files_1.getUserFiles();
const makeExecutable = (binPath) => {
    return execa_1.default('chmod', ['+x', path_1.default.resolve(projectRoot, binPath)]);
};
const makeBinExecutable = async () => {
    const { bin } = pkg;
    if (bin) {
        log_1.info(`Making bin files executable`);
        try {
            if (typeof bin === 'string') {
                await makeExecutable(bin);
            }
            else {
                await Promise.all(Object.values(bin).map((binPath) => makeExecutable(binPath)));
            }
        }
        catch (e) {
            log_1.error(`Could not make ${JSON.stringify(bin)} executable. Check the file(s) exist.`);
            process.exit(1);
        }
    }
};
exports.makeBinExecutable = makeBinExecutable;
