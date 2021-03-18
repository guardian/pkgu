"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortPackage = void 0;
const execa_1 = __importDefault(require("execa"));
const user_files_1 = require("./user-files");
const sortPackage = () => execa_1.default('sort-package-json', { cwd: user_files_1.getUserFiles().projectRoot });
exports.sortPackage = sortPackage;
