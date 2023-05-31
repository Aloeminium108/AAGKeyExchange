

export class NonabelianGroup<E extends Element<any>> {

  public set: Array<E>

  constructor(length: number, size: number, element: { new(length: number): E}, options?: any ) {
    this.set = Array<E>(size)  
  }

}

export abstract class Element<T extends Element<any>> {

  constructor(public length: number) {}

  abstract representation: () => any

  abstract equals: (y: T) => boolean
  abstract multiply: (y: T) => T 
  abstract conjugate: (y: T) => T
  abstract commute: (y: T) => T
  abstract inverse: () => T
  abstract random: () => T
}