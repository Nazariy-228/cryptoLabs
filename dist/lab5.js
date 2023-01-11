"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathjs_1 = require("mathjs");
const promptSync = require("prompt-sync");
const utils_1 = require("./utils");
const prompt = promptSync();
const lastRangeValue = 10000;
const p = (0, utils_1.generatePrime)(3, lastRangeValue);
let q = (0, utils_1.generatePrime)(3, lastRangeValue);
while (p === q) {
    q = (0, utils_1.generatePrime)(3, lastRangeValue);
}
const n = p * q;
const phi = (p - 1) * (q - 1);
let e = (0, mathjs_1.randomInt)(1, phi);
while ((0, utils_1.gcdex)(e, phi)[0] !== 1) {
    e = (0, mathjs_1.randomInt)(1, phi);
}
const d = (0, utils_1.inverseElement)(e, phi);
const publicKey = [n, e];
const privateKey = [n, d];
let m = prompt(`Enter the number in range [1;${n - 2}]: `);
while (!m.match(/^\d+$/) || parseInt(m) < 1 || parseInt(m) > n - 2) {
    console.log(`Invalid input. m must be a number in range [1; ${n - 2}]`);
    m = prompt(`Enter the number in range [1;${n - 2}]: `);
}
const c = (0, utils_1.RSA_Encoding)(parseInt(m), publicKey);
console.log(`Encoded message: ${c}`);
const decodedM = (0, utils_1.RSA_Decoding)(c, privateKey);
console.log(`Decoded message: ${decodedM}`);
//# sourceMappingURL=lab5.js.map