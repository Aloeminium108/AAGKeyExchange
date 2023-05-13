"use strict";
/*
  For the key exchange algorithm, we are using a natural Permutation representation
  of elements from the symmetric group, S_{n}

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permutation = exports.SymmetricGroup = void 0;
const NonabelianGroup_1 = require("./NonabelianGroup");
class SymmetricGroup extends NonabelianGroup_1.NonabelianGroup {
    constructor(length, size, element) {
        super(length, size, element);
        let usedElements = [];
        const e = new element(length);
        for (let i = 0; i < size; i++) {
            let publicElement = new element(length).random();
            let nonUnique = true;
            while (nonUnique) {
                publicElement = new element(length).random();
                // Check if the Permutation is equal to the identity element
                if ((publicElement.equals(e)))
                    continue;
                // Check if the Permutation is its own inverse
                if (publicElement.equals(publicElement.inverse()))
                    continue;
                // Check if the Permutation has been used already
                nonUnique = false;
                usedElements.forEach(element => {
                    if (publicElement.equals(element))
                        nonUnique = true;
                });
            }
            this.set[i] = publicElement;
            usedElements.push(publicElement);
            usedElements.push(publicElement.inverse());
        }
    }
}
exports.SymmetricGroup = SymmetricGroup;
class Permutation extends NonabelianGroup_1.Element {
    constructor(length) {
        super(length);
        this.random = () => {
            let rand = new Permutation(this.vector.length);
            rand.vector.sort(() => Math.random() - 0.5);
            return rand;
        };
        this.equals = (y) => {
            if (this === y)
                return true;
            if (this.vector.length !== y.vector.length)
                return false;
            for (let i = 0; i < this.vector.length; i++) {
                if (this.vector[i] !== y.vector[i])
                    return false;
            }
            return true;
        };
        this.inverse = () => {
            let inverse = new Permutation(this.vector.length);
            this.vector.forEach((position, index) => {
                inverse.vector[position] = index;
            });
            return inverse;
        };
        this.multiply = (y) => {
            if (this.vector.length !== y.vector.length) {
                throw new Error('Both elements must have the same length');
            }
            let product = new Permutation(this.vector.length);
            y.vector.forEach((position, index) => {
                product.vector[index] = this.vector[position];
            });
            return product;
        };
        this.conjugate = (y) => {
            const invX = this.inverse();
            return invX.multiply(y.multiply(this));
        };
        let e = [];
        for (let i = 0; i < length; i++) {
            e.push(i);
        }
        this.vector = e;
    }
    commute(y) {
        const invX = this.inverse();
        const invY = y.inverse();
        return invX.multiply(invY.multiply(this.multiply(y)));
    }
}
exports.Permutation = Permutation;
