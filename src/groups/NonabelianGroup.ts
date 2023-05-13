

export class NonabelianGroup<E extends Element<any>> {

  public set: Array<E>

  constructor(length: number, size: number, element: { new(length: number): E} ) {
    this.set = Array<E>(size)
    let usedElements: Array<E> = []
    const e = new element(length)
  
    for (let i = 0; i < size; i++) {
      let Permutation = new element(length).random()
      let nonUnique = true
  
      while (nonUnique) {
        Permutation = new element(length).random()
  
        // Check if the Permutation is equal to the identity element
        if ((Permutation.equals(e))) continue
  
        // Check if the Permutation is its own inverse
        if (Permutation.equals(Permutation.inverse())) continue
  
        // Check if the Permutation has been used already
        nonUnique = false
        usedElements.forEach(element => {
          if (Permutation.equals(element)) nonUnique = true
        })
      }
  
      this.set[i] = Permutation
  
      usedElements.push(Permutation)
      usedElements.push(Permutation.inverse())
  
    }
  
    
  }

}

export abstract class Element<T extends Element<any>> {

  constructor(public length: number) {}

  abstract equals: (y: T) => boolean
  abstract multiply: (y: T) => T 
  abstract conjugate: (y: T) => T
  abstract inverse: () => T
  abstract random: () => T

}