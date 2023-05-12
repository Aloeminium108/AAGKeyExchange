"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aag_protocol_1 = require("./SGRepresentation/aag-protocol");
const permutation_1 = require("./SGRepresentation/permutation");
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
        const alice = (0, aag_protocol_1.generateKeys)(LENGTH, SIZE);
        const bob = (0, aag_protocol_1.generateKeys)(LENGTH, SIZE);
        const aliceConjugatedkey = (0, aag_protocol_1.conjugateKey)(alice.publicKey, bob.privateKey);
        const bobConjugatedkey = (0, aag_protocol_1.conjugateKey)(bob.publicKey, alice.privateKey);
        const sharedKeyA = (0, aag_protocol_1.generateSharedKey)(aliceConjugatedkey, alice.privateTuple, alice.privateKey, true);
        const sharedKeyB = (0, aag_protocol_1.generateSharedKey)(bobConjugatedkey, bob.privateTuple, bob.privateKey, false);
        const correctKey = (0, permutation_1.commute)(alice.privateKey, bob.privateKey);
        if ((0, permutation_1.equals)(sharedKeyA, correctKey) && (0, permutation_1.equals)(sharedKeyB, correctKey)) {
            console.log('TEST PASSED');
        }
        else {
            console.log('TEST FAILED: ');
            console.log(`Shared key calculated by Alice: ${sharedKeyA}`);
            console.log(`Shared key calculated by Bob: ${sharedKeyB}`);
            console.log('Correct shared key:', (0, permutation_1.commute)(alice.privateKey, bob.privateKey));
            numFailedTests++;
        }
    }
    if (numFailedTests === 0) {
        console.log('ALL TESTS PASSED');
    }
    else {
        console.log(`${numFailedTests} TESTS FAILED`);
    }
}
testProtocol(LENGTH, SIZE, NUMTESTS);
