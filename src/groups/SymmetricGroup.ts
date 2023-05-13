/* 
  For the key exchange algorithm, we are using a natural Permutation representation
  of elements from the symmetric group, S_{n}

*/

import { Element, NonabelianGroup } from "./NonabelianGroup"

export class SymmetricGroup extends NonabelianGroup<Permutation> {

  constructor(length: number, size: number, element: { new(length: number): Permutation} ) {
    super(length, size, element)
    let usedElements: Array<Permutation> = []
    const e = new element(length)
  
    for (let i = 0; i < size; i++) {
      let publicElement = new element(length).random()
      let nonUnique = true
  
      while (nonUnique) {
        publicElement = new element(length).random()
  
        // Check if the Permutation is equal to the identity element
        if ((publicElement.equals(e))) continue
  
        // Check if the Permutation is its own inverse
        if (publicElement.equals(publicElement.inverse())) continue
  
        // Check if the Permutation has been used already
        nonUnique = false
        usedElements.forEach(element => {
          if (publicElement.equals(element)) nonUnique = true
        })
      }
  
      this.set[i] = publicElement
  
      usedElements.push(publicElement)
      usedElements.push(publicElement.inverse())
  
    }
  }

}

export class Permutation extends Element<Permutation> {

  vector: Array<number>

  constructor(length: number) {
    super(length)
    let e: Array<number> = []
    for (let i = 0; i < length; i++) {
      e.push(i)
    }
    this.vector = e
  }

  random = () => {
    let rand = new Permutation(this.vector.length)
    rand.vector.sort(() => Math.random() - 0.5)
    return rand
  }

  equals = (y: Permutation): boolean => {
    if (this === y) return true
    if (this.vector.length !== y.vector.length) return false
  
    for (let i = 0; i < this.vector.length; i++) {
      if (this.vector[i] !== y.vector[i]) return false
    }
    return true
  }

  inverse = (): Permutation => {

    let inverse = new Permutation(this.vector.length)
  
    this.vector.forEach((position, index) => {
      inverse.vector[position] = index
    })
  
    return inverse  
  
  }

  multiply = (y: Permutation): Permutation => {

    if (this.vector.length !== y.vector.length) {
      throw new Error('Both elements must have the same length')
    }
  
    let product = new Permutation(this.vector.length)
  
    y.vector.forEach((position, index) => {
      product.vector[index] = this.vector[position]
    })

    return product
  
  }

  conjugate = (y: Permutation): Permutation => {
    const invX = this.inverse()
    return invX.multiply(y.multiply(this))
  }

  commute(y: Permutation): Permutation {
    const invX = this.inverse()
    const invY = y.inverse()
    return invX.multiply(invY.multiply(this.multiply(y)))
  }

}