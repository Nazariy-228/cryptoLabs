"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptSync = require("prompt-sync");
const utils_1 = require("./utils");
const prompt = promptSync();
const [p, g, x, y] = (0, utils_1.generateParams)();
const message = prompt('Enter message to sign: ');
const H = (0, utils_1.getH)(message, p);
const [k, r, s] = (0, utils_1.singing)(p, g, x, y, H);
console.log(`\nSigned message: ("${message}", ${r}, ${s})`);
console.log(`\nChecking the validity of the signature => ${(0, utils_1.verifySignature)(r, p, s, H, y, g) ? '✅' : '❌'}`);
//# sourceMappingURL=lab10.js.map