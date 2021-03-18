#!/usr/bin/env node

import updateNotifier from 'update-notifier';
import type { Package } from 'update-notifier';
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
	pkg: pkg as Package,
	shouldNotifyInNpmScript: true,
	updateCheckInterval: 0,
}).notify({
	isGlobal: false,
	defer: false,
});

void (async () => {
	await compile();
	await verifyPackage();
	await makeBinExecutable();
	info('Done');

	verifyTsConfig();
})();
