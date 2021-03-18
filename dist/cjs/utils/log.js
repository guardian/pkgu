"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.info = exports.error = void 0;
const chalk_1 = __importDefault(require("chalk"));
let count = 1;
const error = (message) => {
    console.error(chalk_1.default.bgRed.black(message));
};
exports.error = error;
const info = (message) => {
    console.log(chalk_1.default.dim(`${count++}. ${message}`));
};
exports.info = info;
const warn = (message) => {
    console.log(chalk_1.default.yellow(message));
};
exports.warn = warn;
