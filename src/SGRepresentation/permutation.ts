/* 
  For the key exchange algorithm, we are using a natural permutation representation
  of elements from the symmetric group, S_{n}

*/

export type permutation = Array<number>

export function identity(length: number): permutation {
  let e: Array<number> = []
  for (let i = 0; i < length; i++) {
    e.push(i)
  }
  return e
}

export function randomPermutation(length: number): permutation {
  let rand = identity(length)
  rand.sort(() => Math.random() - 0.5)
  return rand
}

export function equals(x: permutation, y: permutation): boolean {
  if (x === y) return true
  if (x.length !== y.length) return false

  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) return false
  }
  return true
}

export function inverse(x: permutation): permutation {

  let inverse = Array<number>(x.length)

  x.forEach((position, index) => {
    inverse[position] = index
  })

  return inverse

}

export function multiply(x: permutation, y: permutation): permutation {

  if (x.length !== y.length) {
    throw new Error('Both elements must have the same length')
  }

  let product = Array<number>(x.length)

  y.forEach((position, index) => {
    product[index] = x[position]
  })

  return product

}

export function conjugate(x: permutation, y: permutation): permutation {
  const invX = inverse(x)
  return multiply(invX, multiply(y, x))
}

export function commute(x: permutation, y: permutation): permutation {

  let commutator = multiply(
    multiply(inverse(x), inverse(y)),
    multiply(x, y)
  )

  return commutator

}

export function generateSet(length: number, size: number): Array<permutation> {

  let set = Array<permutation>(size)
  let usedElements: Array<permutation> = []
  const e = identity(length)

  for (let i = 0; i < size; i++) {
    let permutation = randomPermutation(length)
    let nonUnique = true

    while (nonUnique) {
      permutation = randomPermutation(length)

      // Check if the permutation is equal to the identity element
      if (equals(permutation, e)) continue

      // Check if the permutation is its own inverse
      if (equals(permutation, inverse(permutation))) continue

      // Check if the permutation has been used already
      nonUnique = false
      usedElements.forEach(element => {
        if (equals(permutation, element)) nonUnique = true
      })
    }

    set[i] = permutation

    usedElements.push(permutation)
    usedElements.push(inverse(permutation))

  }

  return set

}