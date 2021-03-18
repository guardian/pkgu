"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const execa_1 = __importDefault(require("execa"));
const user_files_1 = require("./user-files");
const log_1 = require("./utils/log");
const { projectRoot } = user_files_1.getUserFiles();
const tsc = (opts) => execa_1.default('tsc', [
    '--project',
    projectRoot,
    '--noEmit',
    'false',
    '--emitDeclarationOnly',
    'false',
    ...Object.entries(opts).flatMap(([opt, val]) => [
        `--${opt}`,
        String(val),
    ]),
]);
const compile = () => {
    log_1.info('Compiling source code');
    return Promise.all([
        tsc({
            module: 'commonjs',
            target: 'ES2018',
            outDir: 'dist/cjs',
            // make sure we override everything that
            // could have been set in the project config
            declaration: false,
            declarationDir: null,
            declarationMap: false,
        }),
        tsc({
            module: 'ES2020',
            target: 'ES2015',
            outDir: 'dist/esm',
            declaration: true,
            declarationDir: 'dist/types',
            declarationMap: true,
        }),
    ]);
};
exports.compile = compile;
