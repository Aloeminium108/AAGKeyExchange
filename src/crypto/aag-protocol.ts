import { Element, NonabelianGroup } from "../groups/NonabelianGroup"

export class AAGProtocol<G extends NonabelianGroup<E>, E extends Element<any>> {

  publicKey: G
  privateTuple: Array<choice>
  privateKey: E

  constructor(length: number, size: number, group: { new(length: number, size: number, element: { new(legnth: number): E}): G }, element: { new(length: number): E}) {

    this.publicKey = new group(length, size, element)
    this.privateTuple = Array<choice>(size)
    
    for (let i = 0; i < size; i++) {
      let rand = Math.random() * 3
      if (rand < 1) {
        this.privateTuple[i] = choice.ELEMENT
      } else if (rand < 2) {
        this.privateTuple[i] = choice.INVERSE
      } else {
        this.privateTuple[i] = choice.IDENTITY
      }
    }

    this.privateKey = new element(length)

    this.publicKey.set.forEach((element, index) => {
      if (this.privateTuple[index] === choice.ELEMENT) {
        this.privateKey = this.privateKey.multiply(element)
      } else if (this.privateTuple[index] === choice.INVERSE) {
        this.privateKey = this.privateKey.multiply(element.inverse())
      }
    })

  }

  conjugateKey = (publicKey: G): Array<E> => {
  
    let conjugatedKey = Array<E>(publicKey.set.length)
  
    publicKey.set.forEach((element, index) => {
      conjugatedKey[index] = this.privateKey.conjugate(element)
    })
  
    return conjugatedKey
  
  }

  generateSharedKey(
    conjugatedKey: Array<E>, 
    element: { new(length: number): E },
    alice: boolean
  ): E {
  
    let commutator = new element(this.privateKey.length)
  
    conjugatedKey.forEach((element, index) => {
        if (this.privateTuple[index] === choice.ELEMENT) {
          commutator = commutator.multiply(element)
        } else if (this.privateTuple[index] === choice.INVERSE) {
          commutator = commutator.multiply(element.inverse())
        }
    })
  
    if (alice) {
      commutator = this.privateKey.inverse().multiply(commutator)
    } else {
      commutator = this.privateKey.inverse().multiply(commutator).inverse()
    }
  
    return commutator
  }

}

enum choice {
  IDENTITY,
  INVERSE,
  ELEMENT
}