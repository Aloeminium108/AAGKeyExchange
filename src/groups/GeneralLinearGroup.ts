import { Element, NonabelianGroup } from "./NonabelianGroup"

export class GeneralLinearGroup extends NonabelianGroup<Matrix> {

  constructor(length: number, size: number, element: { new(length: number): Matrix}, options: { field: number } ) {
    super(length, size, element)
    Matrix.setField(options.field)
    let usedElements: Array<Matrix> = []
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

export class Matrix extends Element<Matrix> {

  vector: Array<Array<number>>

  static field: number

  constructor(length: number) {
    super(length)
    let e: Array<Array<number>> = []
    for (let i = 0; i < length; i++) {
      let column : Array<number> = []
      for (let j = 0; j < length; j++) {
        const entry = i == j ?
          1 : 0
        column.push(entry)
      }
      e.push(column)
    }
    this.vector = e
  }

  representation = () => this.vector

  random = () => {
    let rand = new Matrix(this.vector.length)

    // TODO Implement random matrix function

    return rand
  }

  equals = (y: Matrix): boolean => {
    if (this === y) return true
    if (this.vector.length !== y.vector.length) return false
  
    for (let i = 0; i < this.vector.length; i++) {
      if (this.vector[i].length !== y.vector[i].length) return false
      for (let j = 0; j < this.vector[i].length; i++) {
        if (this.vector[i][j] !== y.vector[i][j]) return false
      }
    }
    return true
  }

  inverse = (): Matrix => {

    let inverse = new Matrix(this.vector.length)
  
    // TODO Implement matrix inverse function

    /*
      The inverse of a matrix A is equal to (1/det(A))adj(A)
      Where det(A) is the determinant of A
      And adj(A) is the adjugate of A

      The adjugate of A is equal to the transpose of the cofactor matrix of A
      The cofactor matrix of A is equal to ((-1)^{i+j}M_{ij}_{1<=i,j,+n})
      Where M is the (i,j)-minor of A;

      M_{ij} is equal to the determinant of the (n-1) x (n-1) matrix that
      results from deleting row i and column j of A
    */

    
  
    return inverse  
  
  }

  multiply = (y: Matrix): Matrix => {

    let product = new Matrix(this.vector.length)

    // TODO Test matrix multiply function

    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        product.vector[i][j] = dotProduct(this.row(i), y.column(j), Matrix.field)
      }
    }

    return product
  
  }

  conjugate = (y: Matrix): Matrix => {
    const invX = this.inverse()
    return invX.multiply(y.multiply(this))
  }

  commute = (y: Matrix): Matrix => {
    const invX = this.inverse()
    const invY = y.inverse()
    return invX.multiply(invY.multiply(this.multiply(y)))
  }

  determinant = (): number => {

    // TODO implement Matrix determinant function

    return 0;

  }

  row = (index: number): Array<number> => {
    return this.vector[index]
  }

  column = (index: number): Array<number> => {
    let column: Array<number> = []

    for (let i = 0; i < this.length; i++) {
      column.push(this.vector[i][index])
    }

    return column
  }

  static setField(field: number) {
    Matrix.field = field
  }

}

function dotProduct(row: Array<number>, column: Array<number>, modulus: number) {
  let sum = 0

  for (let i = 0; i < row.length; i++) {
    sum += (row[i] * column[i]) % modulus
  }

  return sum % modulus

}