"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptSync = require("prompt-sync");
const utils_1 = require("./utils");
const prompt = promptSync();
console.log(`gcdex(612, 342) = [${(0, utils_1.gcdex)(612, 342)}]`);
console.log(`inverseElement(5, 18) = ${(0, utils_1.inverseElement)(5, 18)}`);
let m = prompt('Enter m: ');
while (!m.match(/^\d+$/)) {
    console.log('m must be a number');
    m = prompt('Enter m: ');
}
console.log(`phi(${m}) = ${(0, utils_1.phi)(parseInt(m))}`);
console.log(`inverseElement_V2(5, 18) = ${(0, utils_1.inverseElement_V2)(5, 18)}`);
//# sourceMappingURL=lab4.js.map