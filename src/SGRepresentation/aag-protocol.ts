import { conjugate, generateSet, identity, inverse, multiply, permutation } from "./permutation";

enum choice {
  IDENTITY,
  INVERSE,
  ELEMENT
}

export function generateKeys(length: number, size: number): {
  publicKey: Array<permutation>, 
  privateTuple: Array<choice>, 
  privateKey: permutation
} {

  const publicKey = generateSet(length, size)
  const privateTuple = Array<choice>(size)
  
  for (let i = 0; i < size; i++) {
    let rand = Math.random() * 3
    if (rand < 1) {
      privateTuple[i] = choice.ELEMENT
    } else if (rand < 2) {
      privateTuple[i] = choice.INVERSE
    } else {
      privateTuple[i] = choice.IDENTITY
    }
  }

  let privateKey = identity(length)

  publicKey.forEach((element, index) => {
    if (privateTuple[index] === choice.ELEMENT) {
      privateKey = multiply(privateKey, element)
    } else if (privateTuple[index] === choice.INVERSE) {
      privateKey = multiply(privateKey, inverse(element))
    }
  })

  return { publicKey, privateTuple, privateKey }
}

export function conjugateKey(publicKey: Array<permutation>, privateKey: permutation): Array<permutation> {

  let conjugatedKey = Array<permutation>(publicKey.length)

  publicKey.forEach((element, index) => {
    conjugatedKey[index] = conjugate(privateKey, element)
  })

  return conjugatedKey

}

export function generateSharedKey(
  conjugatedKey: Array<permutation>, 
  privateTuple: Array<choice>,
  privateKey: permutation,
  alice: boolean
): permutation {

  let commutator = identity(privateKey.length)

  conjugatedKey.forEach((element, index) => {
      if (privateTuple[index] === choice.ELEMENT) {
        commutator = multiply(commutator, element)
      } else if (privateTuple[index] === choice.INVERSE) {
        commutator = multiply(commutator, inverse(element))
      }
  })

  if (alice) {
    commutator = multiply(inverse(privateKey), commutator)
  } else {
    commutator = inverse(multiply(inverse(privateKey), commutator))
  }

  return commutator
}