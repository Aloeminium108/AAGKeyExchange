export abstract class Element<T extends Element<any>> {

  constructor(public options: object) {}

  abstract representation: () => any
  abstract equals: (y: T) => boolean
  abstract random: () => T
  
}

export abstract class FieldElement<T extends FieldElement<any>> extends Element<T> {

  abstract add: (y: T) => T
  abstract multiply: (y: T) => T

  abstract additiveInverse: () => T
  abstract multiplicativeInverse: () => T

}

export abstract class GroupElement<T extends GroupElement<any>> extends Element<T> {

  abstract multiply: (y: T) => T

  abstract inverse: () => T

  abstract conjugate: (y: T) => T
  abstract commute: (y: T) => T

}