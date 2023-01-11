"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathjs_1 = require("mathjs");
const bigInt = require("big-integer");
const promptSync = require("prompt-sync");
const utils_1 = require("./utils");
const prompt = promptSync();
console.log('\nKey exchange protocol Diffie-Hellman');
console.log('------------------------------------------------');
let p = (0, utils_1.generatePrime)(3, 50);
let g = (0, utils_1.getG)(p);
const a = (0, mathjs_1.randomInt)(1, 30);
const b = (0, mathjs_1.randomInt)(1, 30);
const A = bigInt(g).modPow(a, p).toJSNumber();
const B = bigInt(g).modPow(b, p).toJSNumber();
const key2 = bigInt(A).modPow(b, p).toJSNumber();
const key1 = bigInt(B).modPow(a, p).toJSNumber();
console.log(`Received value B (User1 from User2) => ${B}`);
console.log(`Received value A (User2 from User1) => ${A}`);
console.log(`Secret key => ${key1}`);
console.log('\n\nElGamal algorithm');
console.log('------------------------------------------------');
p = (0, utils_1.generatePrime)(30, 100);
g = (0, utils_1.getG)(p);
const x = (0, mathjs_1.randomInt)(1, p);
const y = bigInt(g).modPow(x, p).toJSNumber();
const publicKey = [p, g, y];
const privateKey = x;
let m = prompt(`Enter the number in range [0;${p - 1}]: `);
while (!m.match(/^\d+$/) || parseInt(m) < 0 || parseInt(m) > p - 1) {
    console.log(`Invalid input. m must be a number in range [0; ${p - 1}]`);
    m = prompt(`Enter the number in range [0;${p - 1}]: `);
}
const encryptedNumber = (0, utils_1.ElGamalEncryption)(parseInt(m), p, g, y);
console.log(`Encrypted number => [${encryptedNumber.join(' ')}]`);
const value = (0, utils_1.ElGamalDecryption)(encryptedNumber[0], encryptedNumber[1], x, p);
console.log(`Decrypted number => ${value}`);
//# sourceMappingURL=lab8.js.map