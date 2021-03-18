"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFiles = void 0;
const path_1 = __importDefault(require("path"));
const pkg_dir_1 = __importDefault(require("pkg-dir"));
const log_1 = require("./utils/log");
let projectRoot;
let pkg;
let tsConfig;
const getUserFiles = () => {
    projectRoot || (projectRoot = pkg_dir_1.default.sync());
    if (!projectRoot) {
        log_1.error('Cannot find package.json');
        process.exit(1);
    }
    pkg || (pkg = require(path_1.default.resolve(projectRoot, 'package.json')));
    try {
        tsConfig || (tsConfig = require(path_1.default.resolve(projectRoot, 'tsconfig.json')));
    }
    catch (e) {
        log_1.error('Cannot find tsconfig.json');
        process.exit(1);
    }
    return { pkg, projectRoot, tsConfig };
};
exports.getUserFiles = getUserFiles;
