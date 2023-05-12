import { conjugateKey, generateKeys, generateSharedKey } from "./SGRepresentation/aag-protocol"
import { permutation, randomPermutation, multiply, identity, inverse, conjugate, generateSet, commute, equals } from "./SGRepresentation/permutation"

const SIZE = 16
const LENGTH = 32
const NUMTESTS = 20

// console.log('Alice\'s public key:', alice.publicKey)
// console.log('Alice\'s private key:', alice.privateKey)
// console.log('Bob\'s public key:', bob.publicKey)
// console.log('Bob\'s private key:', bob.privateKey)

// console.log(`Shared key calculated by Alice: ${sharedKeyA}`)
// console.log(`Shared key calculated by Bob: ${sharedKeyB}`)

// console.log('Correct shared key:', commute(alice.privateKey, bob.privateKey)) 

function testProtocol(length: number, size: number, numtests: number) {

  let numFailedTests = 0

  for (let i = 0; i < numtests; i++) {
    const alice = generateKeys(LENGTH, SIZE)
    const bob = generateKeys(LENGTH, SIZE)
  
    const aliceConjugatedkey = conjugateKey(alice.publicKey, bob.privateKey)
    const bobConjugatedkey = conjugateKey(bob.publicKey, alice.privateKey)
  
    const sharedKeyA = generateSharedKey(aliceConjugatedkey, alice.privateTuple, alice.privateKey, true)
    const sharedKeyB = generateSharedKey(bobConjugatedkey, bob.privateTuple, bob.privateKey, false)
    const correctKey = commute(alice.privateKey, bob.privateKey)

    if (equals(sharedKeyA, correctKey) && equals(sharedKeyB, correctKey)) {
      console.log('TEST PASSED')
    } else {
      console.log('TEST FAILED: ')
      console.log(`Shared key calculated by Alice: ${sharedKeyA}`)
      console.log(`Shared key calculated by Bob: ${sharedKeyB}`)
      console.log('Correct shared key:', commute(alice.privateKey, bob.privateKey)) 
      numFailedTests++
    }
  }

  if (numFailedTests === 0) {
    console.log('ALL TESTS PASSED')
  } else {
    console.log(`${numFailedTests} TESTS FAILED`)
  }

}

testProtocol(LENGTH, SIZE, NUMTESTS)