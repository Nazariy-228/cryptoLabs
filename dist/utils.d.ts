import * as nj from 'numjs';
export declare const insert: (array: nj.NdArray<any>, index: number, values: any[], axis: 0 | 1) => nj.NdArray<any>;
export declare const gcdex: (a: number, b: number) => number[];
export declare const inverseElement: (a: number, n: number) => number;
export declare const phi: (n: number) => number;
export declare const inverseElement_V2: (a: number, n: number) => number;
export declare const millerRabinTest: (n: number, a: number) => boolean;
export declare const isPrime: (n: number) => boolean;
export declare const generatePrime: (firstRangeValue: number, lastRangeValue: number) => number;
export declare const RSA_Encoding: (m: number, publicKey: number[]) => number;
export declare const RSA_Decoding: (c: number, privateKey: number[]) => number;
export declare const mul02: (byte: any) => number;
export declare const mul03: (byte: any) => number;
export declare const isPrimitiveRoot: (g: number, p: number) => boolean;
export declare const getG: (p: number) => number;
export declare const ElGamalEncryption: (value: number, p: number, g: number, y: number) => number[];
export declare const ElGamalDecryption: (a: number, b: number, x: number, p: number) => number;
export declare const generateParams: () => number[];
export declare const singing: (p: number, g: number, x: number, y: number, m: number) => number[];
export declare const verifySignature: (r: number, p: number, s: number, m: number, y: number, g: number) => boolean;
export declare const getH: (m: string, p: number) => number;
export declare const getAllPointsEllipticCurve: (count: number) => any[];
export declare const addPoint: (firstPoint: number[], secondPoint: number[], count: number, a: number) => number[];
export declare const findOrderPoint: (firstPoint: number[], count: number, a: number) => number;
export declare const EDSA_singing: (point: number[], a: number, module: number, pointOrder: number, h: number) => (number | number[])[];
export declare const EDSA_verifySignature: (r: number, s: number, pointOrder: number, Q: number[], point: number[], module: number, a: number, h: number) => boolean;
