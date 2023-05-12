"use strict";
/*
  For the key exchange algorithm, we are using a natural permutation representation
  of elements from the symmetric group, S_{n}

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSet = exports.commute = exports.conjugate = exports.multiply = exports.inverse = exports.equals = exports.randomPermutation = exports.identity = void 0;
function identity(length) {
    let e = [];
    for (let i = 0; i < length; i++) {
        e.push(i);
    }
    return e;
}
exports.identity = identity;
function randomPermutation(length) {
    let rand = identity(length);
    rand.sort(() => Math.random() - 0.5);
    return rand;
}
exports.randomPermutation = randomPermutation;
function equals(x, y) {
    if (x === y)
        return true;
    if (x.length !== y.length)
        return false;
    for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i])
            return false;
    }
    return true;
}
exports.equals = equals;
function inverse(x) {
    let inverse = Array(x.length);
    x.forEach((position, index) => {
        inverse[position] = index;
    });
    return inverse;
}
exports.inverse = inverse;
function multiply(x, y) {
    if (x.length !== y.length) {
        throw new Error('Both elements must have the same length');
    }
    let product = Array(x.length);
    y.forEach((position, index) => {
        product[index] = x[position];
    });
    return product;
}
exports.multiply = multiply;
function conjugate(x, y) {
    const invX = inverse(x);
    return multiply(invX, multiply(y, x));
}
exports.conjugate = conjugate;
function commute(x, y) {
    let commutator = multiply(multiply(inverse(x), inverse(y)), multiply(x, y));
    return commutator;
}
exports.commute = commute;
function generateSet(length, size) {
    let set = Array(size);
    let usedElements = [];
    const e = identity(length);
    for (let i = 0; i < size; i++) {
        let permutation = randomPermutation(length);
        let nonUnique = true;
        while (nonUnique) {
            permutation = randomPermutation(length);
            // Check if the permutation is equal to the identity element
            if (equals(permutation, e))
                continue;
            // Check if the permutation is its own inverse
            if (equals(permutation, inverse(permutation)))
                continue;
            // Check if the permutation has been used already
            nonUnique = false;
            usedElements.forEach(element => {
                if (equals(permutation, element))
                    nonUnique = true;
            });
        }
        set[i] = permutation;
        usedElements.push(permutation);
        usedElements.push(inverse(permutation));
    }
    return set;
}
exports.generateSet = generateSet;
