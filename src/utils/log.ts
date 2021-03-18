import chalk from 'chalk';

let count = 1;

export const error = (message: string): void => {
	console.error(chalk.bgRed.black(message));
};

export const info = (message: string): void => {
	console.log(chalk.dim(`${count++}. ${message}`));
};

export const warn = (message: string): void => {
	console.log(chalk.yellow(message));
};
