"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDSA_verifySignature = exports.EDSA_singing = exports.findOrderPoint = exports.addPoint = exports.getAllPointsEllipticCurve = exports.getH = exports.verifySignature = exports.singing = exports.generateParams = exports.ElGamalDecryption = exports.ElGamalEncryption = exports.getG = exports.isPrimitiveRoot = exports.mul03 = exports.mul02 = exports.RSA_Decoding = exports.RSA_Encoding = exports.generatePrime = exports.isPrime = exports.millerRabinTest = exports.inverseElement_V2 = exports.phi = exports.inverseElement = exports.gcdex = exports.insert = void 0;
const nj = require("numjs");
const bigInt = require("big-integer");
const mathjs_1 = require("mathjs");
const insert = (array, index, values, axis) => {
    if (axis === 0) {
        const firstPart = array.slice([0, index], null).tolist();
        const secondPart = array.slice([index, array.shape[0]], null).tolist();
        return nj.array([...firstPart, values, ...secondPart]);
    }
    else {
        const result = [];
        const copy = array.tolist();
        for (let i = 0; i < copy.length; i++) {
            const firstPart = copy[i].slice(0, index);
            const secondPart = copy[i].slice(index, copy[i].length);
            result.push([...firstPart, values[i], ...secondPart]);
        }
        return nj.array(result);
    }
};
exports.insert = insert;
const gcdex = (a, b) => {
    let [a0, a1] = [a, b];
    let [x0, x1] = [1, 0];
    let [y0, y1] = [0, 1];
    while (a1 !== 0) {
        let q = Math.floor(a0 / a1);
        [a0, a1] = [a1, a0 - q * a1];
        [x0, x1] = [x1, x0 - q * x1];
        [y0, y1] = [y1, y0 - q * y1];
    }
    return [a0, x0, y0];
};
exports.gcdex = gcdex;
const inverseElement = (a, n) => {
    const [d, x] = (0, exports.gcdex)(a, n);
    if (d !== 1) {
        throw new Error(`a(${a}) and n(${n}) are not mutually prime`);
    }
    return (0, mathjs_1.mod)(x, n);
};
exports.inverseElement = inverseElement;
const phi = (n) => {
    function gcd(a, b) {
        if (a === 0) {
            return b;
        }
        return gcd((0, mathjs_1.mod)(b, a), a);
    }
    let result = 1;
    for (let i = 2; i < n; i++) {
        if (gcd(i, n) === 1) {
            result++;
        }
    }
    return result;
};
exports.phi = phi;
const inverseElement_V2 = (a, n) => {
    return (0, mathjs_1.mod)(Math.pow(a, (0, exports.phi)(n) - 1), n);
};
exports.inverseElement_V2 = inverseElement_V2;
const millerRabinTest = (n, a) => {
    if ((0, exports.gcdex)(n, a)[0] > 1) {
        return false;
    }
    let s = 0;
    let nCopy = n - 1;
    while (nCopy % 2 === 0) {
        s++;
        nCopy /= 2;
    }
    const d = (n - 1) / Math.pow(2, s);
    const x = (0, mathjs_1.mod)(Math.pow(a, d), n);
    if (x === 1 || x === -1) {
        return true;
    }
    for (let i = 1; i < s; i++) {
        const v = (0, mathjs_1.mod)(Math.pow(x, Math.pow(2, i)), n);
        if (v === 1) {
            return false;
        }
        else if (v === -1) {
            return true;
        }
    }
    return true;
};
exports.millerRabinTest = millerRabinTest;
const isPrime = (n) => {
    for (let i = 0; i < 100; i++) {
        const a = (0, mathjs_1.randomInt)(0, n);
        if (!(0, exports.millerRabinTest)(n, a)) {
            return false;
        }
    }
    return true;
};
exports.isPrime = isPrime;
const generatePrime = (firstRangeValue, lastRangeValue) => {
    let value = (0, mathjs_1.randomInt)(firstRangeValue, lastRangeValue);
    while (!(0, exports.isPrime)(value)) {
        value = (0, mathjs_1.randomInt)(firstRangeValue, lastRangeValue);
    }
    return value;
};
exports.generatePrime = generatePrime;
const RSA_Encoding = (m, publicKey) => {
    const n = publicKey[0];
    const e = publicKey[1];
    return bigInt(m).modPow(bigInt(e), bigInt(n)).toJSNumber();
};
exports.RSA_Encoding = RSA_Encoding;
const RSA_Decoding = (c, privateKey) => {
    const n = privateKey[0];
    const d = privateKey[1];
    return bigInt(c).modPow(bigInt(d), bigInt(n)).toJSNumber();
};
exports.RSA_Decoding = RSA_Decoding;
const mul02 = (byte) => {
    let byteInDes = byte;
    let inputBinByte = byteInDes.toString(2);
    let shiftedDesByte = byteInDes << 1;
    let shiftedBinByte = shiftedDesByte.toString(2);
    if (shiftedBinByte.length > 8) {
        shiftedBinByte = shiftedBinByte.slice(shiftedBinByte.length - 8, shiftedBinByte.length);
        shiftedDesByte = parseInt(shiftedBinByte, 2);
    }
    let result = shiftedDesByte;
    if (inputBinByte.length === 8 && inputBinByte[0] === '1') {
        const XOR_VALUE = '00011011';
        const XOR_DEC_VALUE = parseInt(XOR_VALUE, 2);
        result = shiftedDesByte ^ XOR_DEC_VALUE;
    }
    return result;
};
exports.mul02 = mul02;
const mul03 = (byte) => {
    return (0, exports.mul02)(byte) ^ byte;
};
exports.mul03 = mul03;
const isPrimitiveRoot = (g, p) => {
    for (let i = 1; i < p - 1; i++) {
        if ((0, mathjs_1.mod)(Math.pow(g, i), p) === 1) {
            return false;
        }
    }
    return true;
};
exports.isPrimitiveRoot = isPrimitiveRoot;
const getG = (p) => {
    while (true) {
        const g = (0, mathjs_1.randomInt)(2, p);
        if ((0, exports.isPrimitiveRoot)(g, p)) {
            return g;
        }
    }
};
exports.getG = getG;
const ElGamalEncryption = (value, p, g, y) => {
    const k = (0, mathjs_1.randomInt)(1, p - 1);
    const a = bigInt(g).modPow(bigInt(k), bigInt(p)).toJSNumber();
    const b = (0, mathjs_1.mod)(bigInt(y).modPow(bigInt(k), bigInt(p)).multiply(bigInt(value)).toJSNumber(), p);
    return [a, b];
};
exports.ElGamalEncryption = ElGamalEncryption;
const ElGamalDecryption = (a, b, x, p) => {
    return bigInt(b)
        .multiply(bigInt(a).pow(p - 1 - x))
        .mod(p)
        .toJSNumber();
};
exports.ElGamalDecryption = ElGamalDecryption;
const generateParams = () => {
    const p = (0, exports.generatePrime)(3000, 10000);
    const g = (0, exports.getG)(p);
    const x = (0, mathjs_1.randomInt)(1, p - 2);
    const y = bigInt(g).modPow(bigInt(x), bigInt(p)).toJSNumber();
    return [p, g, x, y];
};
exports.generateParams = generateParams;
const singing = (p, g, x, y, m) => {
    const k = (0, exports.generatePrime)(2, p - 2);
    const r = bigInt(g).modPow(bigInt(k), bigInt(p)).toJSNumber();
    const s = (0, mathjs_1.mod)(bigInt(m)
        .minus(bigInt(x).multiply(bigInt(r)))
        .multiply(bigInt((0, exports.inverseElement)(k, p - 1)))
        .toJSNumber(), p - 1);
    return [k, r, s];
};
exports.singing = singing;
const verifySignature = (r, p, s, m, y, g) => {
    if (!((0 < r && r < p) || (0 < s && s < p - 1))) {
        return false;
    }
    const temp = (0, mathjs_1.mod)(bigInt(y)
        .modPow(bigInt(r), bigInt(p))
        .multiply(bigInt(r).modPow(bigInt(s), bigInt(p)))
        .toJSNumber(), p);
    if (bigInt(g).modPow(bigInt(m), bigInt(p)).toJSNumber() !== temp) {
        return false;
    }
    return true;
};
exports.verifySignature = verifySignature;
const getH = (m, p) => {
    let H = 0;
    for (let i = 0; i < m.length; i++) {
        H += m.charCodeAt(i);
    }
    if (H > p - 1) {
        H = H % p;
    }
    return H;
};
exports.getH = getH;
const getAllPointsEllipticCurve = (count) => {
    const arr = [];
    for (let x = 0; x < count; x++) {
        for (let y = 0; y < count; y++) {
            if ((0, mathjs_1.mod)(Math.pow(y, 2) - (Math.pow(x, 3) + x + 1), count) === 0) {
                arr.push([x, y]);
            }
        }
    }
    return arr;
};
exports.getAllPointsEllipticCurve = getAllPointsEllipticCurve;
const addPoint = (firstPoint, secondPoint, count, a) => {
    let numerator = 3 * Math.pow(firstPoint[0], 2) + a;
    let denominator = 2 * firstPoint[1];
    let temp = (0, mathjs_1.mod)(Math.pow((0, exports.inverseElement)(denominator, count), 1), count) * numerator;
    let s = (0, mathjs_1.mod)(Math.pow(temp, 1), count);
    let x = (0, mathjs_1.mod)(Math.pow(Math.pow(s, 2) - 2 * firstPoint[0], 1), count);
    let y = (0, mathjs_1.mod)(Math.pow(s * (firstPoint[0] - x) - firstPoint[1], 1), count);
    if (firstPoint[0] !== secondPoint[0] || firstPoint[1] !== secondPoint[1]) {
        numerator = secondPoint[1] - firstPoint[1];
        denominator = secondPoint[0] - firstPoint[0];
        temp = (0, mathjs_1.mod)(Math.pow((0, exports.inverseElement)(denominator, count), 1), count) * numerator;
        s = (0, mathjs_1.mod)(Math.pow(temp, 1), count);
        x = (0, mathjs_1.mod)(Math.pow(Math.pow(s, 2) - (secondPoint[0] + firstPoint[0]), 1), count);
        y = (0, mathjs_1.mod)(Math.pow(s * (secondPoint[0] - x) - secondPoint[1], 1), count);
    }
    return [x, y];
};
exports.addPoint = addPoint;
const findOrderPoint = (firstPoint, count, a) => {
    let secondPoint = (0, exports.addPoint)(firstPoint, firstPoint, count, a);
    let d = 2;
    while (firstPoint[0] !== secondPoint[0]) {
        d += 1;
        secondPoint = (0, exports.addPoint)(firstPoint, secondPoint, count, a);
    }
    d += 1;
    return d;
};
exports.findOrderPoint = findOrderPoint;
const EDSA_singing = (point, a, module, pointOrder, h) => {
    let Q = point;
    const d = (0, mathjs_1.randomInt)(2, pointOrder - 2);
    for (let i = 0; i < d - 1; i++) {
        Q = (0, exports.addPoint)(Q, point, module, a);
    }
    const k = (0, mathjs_1.randomInt)(2, pointOrder - 2);
    let C = point;
    for (let i = 0; i < k - 1; i++) {
        C = (0, exports.addPoint)(C, point, module, a);
    }
    const r = (0, mathjs_1.mod)(Math.pow(C[0], 1), pointOrder);
    const temp = (0, exports.inverseElement)(k, pointOrder);
    const s = (0, mathjs_1.mod)(Math.pow((h + d * r) * temp, 1), pointOrder);
    return [r, s, Q];
};
exports.EDSA_singing = EDSA_singing;
const EDSA_verifySignature = (r, s, pointOrder, Q, point, module, a, h) => {
    const u = (0, mathjs_1.mod)(Math.pow(h * (0, exports.inverseElement)(s, pointOrder), 1), pointOrder);
    const v = (0, mathjs_1.mod)(Math.pow(r * (0, exports.inverseElement)(s, pointOrder), 1), pointOrder);
    let pointFirst = point;
    let pointSecond = Q;
    for (let i = 0; i < u - 1; i++) {
        pointFirst = (0, exports.addPoint)(pointFirst, point, module, a);
    }
    for (let i = 0; i < v - 1; i++) {
        pointSecond = (0, exports.addPoint)(pointSecond, Q, module, a);
    }
    const finalPoint = (0, exports.addPoint)(pointFirst, pointSecond, module, a);
    const r_h = (0, mathjs_1.mod)(Math.pow(finalPoint[0], 1), pointOrder);
    return r === r_h;
};
exports.EDSA_verifySignature = EDSA_verifySignature;
//# sourceMappingURL=utils.js.map