"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aag_protocol_1 = require("./crypto/aag-protocol");
const SymmetricGroup_1 = require("./groups/SymmetricGroup");
const SIZE = 16;
const LENGTH = 32;
const NUMTESTS = 20;
// console.log('Alice\'s public key:', alice.publicKey)
// console.log('Alice\'s private key:', alice.privateKey)
// console.log('Bob\'s public key:', bob.publicKey)
// console.log('Bob\'s private key:', bob.privateKey)
// console.log(`Shared key calculated by Alice: ${sharedKeyA}`)
// console.log(`Shared key calculated by Bob: ${sharedKeyB}`)
// console.log('Correct shared key:', commute(alice.privateKey, bob.privateKey)) 
function testProtocol(length, size, numtests) {
    let numFailedTests = 0;
    for (let i = 0; i < numtests; i++) {
        const alice = new aag_protocol_1.AAGProtocol(length, size, SymmetricGroup_1.SymmetricGroup, SymmetricGroup_1.Permutation);
        const bob = new aag_protocol_1.AAGProtocol(length, size, SymmetricGroup_1.SymmetricGroup, SymmetricGroup_1.Permutation);
        const aliceConjugatedkey = bob.conjugateKey(alice.publicKey);
        const bobConjugatedkey = alice.conjugateKey(bob.publicKey);
        const sharedKeyA = alice.generateSharedKey(aliceConjugatedkey, SymmetricGroup_1.Permutation, true);
        const sharedKeyB = bob.generateSharedKey(bobConjugatedkey, SymmetricGroup_1.Permutation, false);
        const correctKey = alice.privateKey.commute(bob.privateKey);
        if ((sharedKeyA.equals(correctKey)) && sharedKeyB.equals(correctKey)) {
            console.log('TEST PASSED');
        }
        else {
            console.log('TEST FAILED: ');
            console.log(`Shared key calculated by Alice: ${sharedKeyA.vector}`);
            console.log(`Shared key calculated by Bob: ${sharedKeyB.vector}`);
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
testProtocol(LENGTH, SIZE, NUMTESTS);
