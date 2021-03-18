#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_notifier_1 = __importDefault(require("update-notifier"));
const compile_1 = require("./compile");
const make_bin_executable_1 = require("./make-bin-executable");
const user_files_1 = require("./user-files");
const log_1 = require("./utils/log");
const verify_package_1 = require("./verify-package");
const verify_tsconfig_1 = require("./verify-tsconfig");
const { pkg } = user_files_1.getUserFiles();
// checks for updated version of this package every time it's run
// the previous result is used in the current run i.e. it doesn't block while making the check
update_notifier_1.default({
    pkg: pkg,
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 0,
}).notify({
    isGlobal: false,
    defer: false,
});
void (async () => {
    await compile_1.compile();
    await verify_package_1.verifyPackage();
    await make_bin_executable_1.makeBinExecutable();
    log_1.info('Done');
    verify_tsconfig_1.verifyTsConfig();
})();
