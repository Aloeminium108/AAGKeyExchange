import { AAGProtocol } from "./crypto/aag-protocol"
import { NonabelianGroup, Element } from "./groups/NonabelianGroup"
import { SymmetricGroup, Permutation } from "./groups/SymmetricGroup"
import { GeneralLinearGroup, Matrix } from "./groups/GeneralLinearGroup"


const SIZE = 16
const LENGTH = 32
const NUMTESTS = 20

function testProtocol<G extends NonabelianGroup<E>, E extends Element<any>>(
  group: { new(length: number, size: number, element: { new(legnth: number): E}): G }, 
  element: { new(length: number): E},
  length: number, 
  size: number, 
  numtests: number,
  options?: any
) {

  let numFailedTests = 0

  for (let i = 0; i < numtests; i++) {
    const alice = new AAGProtocol(group, element, length, size, options)
    const bob = new AAGProtocol(group, element, length, size, options)
  
    const aliceConjugatedkey = bob.conjugateKey(alice.publicKey)
    const bobConjugatedkey = alice.conjugateKey(bob.publicKey)
  
    const sharedKeyA = alice.generateSharedKey(aliceConjugatedkey, element, true)
    const sharedKeyB = bob.generateSharedKey(bobConjugatedkey, element, false)
    const correctKey = alice.privateKey.commute(bob.privateKey)

    if ((sharedKeyA.equals(correctKey)) && sharedKeyB.equals(correctKey)) {
      console.log('TEST PASSED')
    } else {
      console.log('TEST FAILED: ')
      console.log(`Shared key calculated by Alice: ${sharedKeyA.representation}`)
      console.log(`Shared key calculated by Bob: ${sharedKeyB.representation}`)
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

//testProtocol(SymmetricGroup, Permutation, LENGTH, SIZE, NUMTESTS)

const matrix = new Matrix(4)
const matrix2 = new Matrix(4)

Matrix.setField(5)

console.log(matrix.multiply(matrix2).representation())