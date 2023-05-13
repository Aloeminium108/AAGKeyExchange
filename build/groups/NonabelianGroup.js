"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = exports.NonabelianGroup = void 0;
class NonabelianGroup {
    constructor(length, size, element) {
        this.set = Array(size);
        let usedElements = [];
        const e = new element(length);
        for (let i = 0; i < size; i++) {
            let Permutation = new element(length).random();
            let nonUnique = true;
            while (nonUnique) {
                Permutation = new element(length).random();
                // Check if the Permutation is equal to the identity element
                if ((Permutation.equals(e)))
                    continue;
                // Check if the Permutation is its own inverse
                if (Permutation.equals(Permutation.inverse()))
                    continue;
                // Check if the Permutation has been used already
                nonUnique = false;
                usedElements.forEach(element => {
                    if (Permutation.equals(element))
                        nonUnique = true;
                });
            }
            this.set[i] = Permutation;
            usedElements.push(Permutation);
            usedElements.push(Permutation.inverse());
        }
    }
}
exports.NonabelianGroup = NonabelianGroup;
class Element {
    constructor(length) {
        this.length = length;
    }
}
exports.Element = Element;
