#!/usr/bin/env node

import Listr from 'listr';
import sade from 'sade';
import { compile } from './compile';
import { lintPackage } from './lint-package';
import { lintTsConfig } from './lint-tsconfig';
import { makeBinExecutable } from './make-bin-executable';
import { updateCheck } from './update-check';
import { pkg } from './utils/package-files';
import { getUserFiles } from './utils/user-files';
import { verifyPackage } from './verify-package';

const app = sade('pkg');

app.version(pkg.version as string);

app.command('build')
	.describe(
		'Compiles your src directory to ./dist, ready for publishing. Automatically handles creating ESM, CommonJS and types.',
	)
	.action(() => {
		const tasks = new Listr([
			{
				title: 'Check for updates',
				task: () => updateCheck(),
				skip: () => 'not published yet',
			},
			{
				title: 'Verify package.json',
				task: () => lintPackage(),
			},
			{
				title: 'Verify tsconfig.json',
				task: () => lintTsConfig(),
			},
			{
				title: 'Compile source code',
				task: () => compile(),
			},
			{
				title: 'Verify package',
				task: () => verifyPackage(),
			},
			{
				title: 'Create executables',
				task: () => makeBinExecutable(),
				enabled: () => Boolean(getUserFiles().pkg.bin),
			},
		]);

		tasks.run().catch(() => {
			// do nothing - listr displays errors
		});
	});

app.parse(process.argv);
