"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptSync = require("prompt-sync");
const bigInt = require("big-integer");
const lab9_1 = require("./lab9");
const utils_1 = require("./utils");
const prompt = promptSync();
let a = 1;
const arr = (0, utils_1.getAllPointsEllipticCurve)(23);
const beautifyArray = arr.map((item) => `(${item.join(';')})`);
let point = [17, 20];
console.log('\nFirst part');
console.log('---------------------');
console.log('All points of elliptic curve:');
console.table(beautifyArray);
console.log(`Count of points: ${arr.length}`);
console.log(`Order of point G(${point.join(';')}) on elliptic curve: ${(0, utils_1.findOrderPoint)(point, 23, a)}`);
console.log('\nSecond part');
console.log('---------------------');
point = [0, 14];
a = 15;
const modul = 43;
const pointOrder = (0, utils_1.findOrderPoint)(point, modul, a);
const inputText = prompt('Enter message for signing: ');
const H = (0, lab9_1.sha1)(inputText);
const h = bigInt(parseInt(H, 16)).modPow(1, pointOrder).toJSNumber();
const [r, s, Q] = (0, utils_1.EDSA_singing)(point, a, modul, pointOrder, h);
console.log(`Signed message: ("${inputText}", ${r}, ${s}, text)`);
console.log(`Checking the validity of the signature: ${(0, utils_1.EDSA_verifySignature)(r, s, pointOrder, Q, point, modul, a, h)
    ? '✅'
    : '❌'}`);
//# sourceMappingURL=lab11.js.map