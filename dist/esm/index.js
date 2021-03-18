#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import updateNotifier from 'update-notifier';
import { compile } from './compile';
import { makeBinExecutable } from './make-bin-executable';
import { getUserFiles } from './user-files';
import { info } from './utils/log';
import { verifyPackage } from './verify-package';
import { verifyTsConfig } from './verify-tsconfig';
const { pkg } = getUserFiles();
// checks for updated version of this package every time it's run
// the previous result is used in the current run i.e. it doesn't block while making the check
updateNotifier({
    pkg: pkg,
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 0,
}).notify({
    isGlobal: false,
    defer: false,
});
void (() => __awaiter(void 0, void 0, void 0, function* () {
    yield compile();
    yield verifyPackage();
    yield makeBinExecutable();
    info('Done');
    verifyTsConfig();
}))();
