"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aag_protocol_1 = require("./crypto/aag-protocol");
const GeneralLinearGroup_1 = require("./groups/GeneralLinearGroup");
const SIZE = 16;
const LENGTH = 32;
const NUMTESTS = 20;
function testProtocol(group, element, length, size, numtests, options) {
    let numFailedTests = 0;
    for (let i = 0; i < numtests; i++) {
        const alice = new aag_protocol_1.AAGProtocol(group, element, length, size, options);
        const bob = new aag_protocol_1.AAGProtocol(group, element, length, size, options);
        const aliceConjugatedkey = bob.conjugateKey(alice.publicKey);
        const bobConjugatedkey = alice.conjugateKey(bob.publicKey);
        const sharedKeyA = alice.generateSharedKey(aliceConjugatedkey, element, true);
        const sharedKeyB = bob.generateSharedKey(bobConjugatedkey, element, false);
        const correctKey = alice.privateKey.commute(bob.privateKey);
        if ((sharedKeyA.equals(correctKey)) && sharedKeyB.equals(correctKey)) {
            console.log('TEST PASSED');
        }
        else {
            console.log('TEST FAILED: ');
            console.log(`Shared key calculated by Alice: ${sharedKeyA.representation}`);
            console.log(`Shared key calculated by Bob: ${sharedKeyB.representation}`);
            console.log('Correct shared key:', correctKey.vector);
            numFailedTests++;
        }
    }
    if (numFailedTests === 0) {
        console.log('ALL TESTS PASSED!!!');
    }
    else {
        console.log(`${numFailedTests} TESTS FAILED`);
    }
}
//testProtocol(SymmetricGroup, Permutation, LENGTH, SIZE, NUMTESTS)
const matrix = new GeneralLinearGroup_1.Matrix(4);
const matrix2 = new GeneralLinearGroup_1.Matrix(4);
GeneralLinearGroup_1.Matrix.setField(5);
console.log(matrix.multiply(matrix2).representation());
