import chalk from 'chalk';
let count = 1;
export const error = (message) => {
    console.error(chalk.bgRed.black(message));
};
export const info = (message) => {
    console.log(chalk.dim(`${count++}. ${message}`));
};
export const warn = (message) => {
    console.log(chalk.yellow(message));
};
