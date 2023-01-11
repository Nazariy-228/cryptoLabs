"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const BYTE_1 = 0xd4;
const BYTE_2 = 0xbf;
console.log(`mul02(0xD4) = 0x${(0, utils_1.mul02)(BYTE_1).toString(16).toUpperCase()}`);
console.log(`mul03(0xBF) = 0x${(0, utils_1.mul03)(BYTE_2).toString(16).toUpperCase()}`);
//# sourceMappingURL=lab6.js.map