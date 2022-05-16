import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';

const tasks = new Listr([
	{
		title: 'Building the project',
		task: () => execa('yarn', ['build']),
	},
	{
		title: 'Installing the build artefacts',
		task: () => execa('yarn', ['add', '-D', 'file:.']),
	},
	{
		title: 'Building the project using the installed version',
		task: () => execa('yarn', ['pkgu', 'build']),
	},
	{
		title: 'Diffing the builds',
		task: () =>
			execa('diff', [
				'--brief',
				'--recursive',
				'node_modules/@guardian/pkgu/dist',
				'dist',
			]),
	},
	{
		title: 'Removing the installed version',
		task: () => execa('yarn', ['remove', '@guardian/pkgu']),
	},
]);

interface BuildError {
	stdout: string;
}

tasks
	.run()
	.then(() =>
		console.log(
			chalk.green(
				'The builds are identical. The project builds itself correctly.',
			),
		),
	)
	.catch((e: BuildError) => {
		console.log(
			chalk.red(
				'The builds are not identical. The project does not build itself correctly.',
			),
		);
		console.log(e.stdout);
	});
