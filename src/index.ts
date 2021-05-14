#!/usr/bin/env node

import chalk from 'chalk';
import Listr from 'listr';
import sade from 'sade';
import { checkForUpdates } from './check-for-updates';
import { compile } from './compile';
import { makeBinExecutable } from './make-bin-executable';
import { pkg } from './utils/package-files';
import { getUserFiles } from './utils/user-files';
import { verifyCompiledPackage } from './verify-compiled-package';
import { verifyPackageJson } from './verify-package-json';
import { verifyTsconfig } from './verify-tsconfig';

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
				task: (ctx, task) => checkForUpdates(ctx, task),
			},
			{
				title: 'Verify package.json',
				task: () => verifyPackageJson(),
			},
			{
				title: 'Verify tsconfig.json',
				task: () => verifyTsconfig(),
			},
			{
				title: 'Compile source code',
				task: () => compile(),
			},
			{
				title: 'Verify compiled package',
				task: () => verifyCompiledPackage(),
			},
			{
				title: 'Create executables',
				task: () => makeBinExecutable(),
				enabled: () => Boolean(getUserFiles().pkg.bin),
			},
		]);

		tasks
			.run()
			.then(() => console.log(chalk.green('Build successful.')))
			.catch(() => {
				process.exit(1);
			});
	});

app.parse(process.argv);
