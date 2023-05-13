import { AAGProtocol } from "./crypto/aag-protocol"
import { Permutation, SymmetricGroup } from "./groups/SymmetricGroup"


const SIZE = 16
const LENGTH = 32
const NUMTESTS = 20

function testProtocol(length: number, size: number, numtests: number) {

  let numFailedTests = 0

  for (let i = 0; i < numtests; i++) {
    const alice = new AAGProtocol(length, size, SymmetricGroup, Permutation)
    const bob = new AAGProtocol(length, size, SymmetricGroup, Permutation)
  
    const aliceConjugatedkey = bob.conjugateKey(alice.publicKey)
    const bobConjugatedkey = alice.conjugateKey(bob.publicKey)
  
    const sharedKeyA = alice.generateSharedKey(aliceConjugatedkey, Permutation, true)
    const sharedKeyB = bob.generateSharedKey(bobConjugatedkey, Permutation, false)
    const correctKey = alice.privateKey.commute(bob.privateKey)

    if ((sharedKeyA.equals(correctKey)) && sharedKeyB.equals(correctKey)) {
      console.log('TEST PASSED')
    } else {
      console.log('TEST FAILED: ')
      console.log(`Shared key calculated by Alice: ${sharedKeyA.vector}`)
      console.log(`Shared key calculated by Bob: ${sharedKeyB.vector}`)
      console.log('Correct shared key:', correctKey.vector) 
      numFailedTests++
    }
  }

  if (numFailedTests === 0) {
    console.log('ALL TESTS PASSED!!!')
  } else {
    console.log(`${numFailedTests} TESTS FAILED`)
  }

}

testProtocol(LENGTH, SIZE, NUMTESTS)