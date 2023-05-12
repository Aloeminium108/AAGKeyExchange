"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSharedKey = exports.conjugateKey = exports.generateKeys = void 0;
const permutation_1 = require("./permutation");
var choice;
(function (choice) {
    choice[choice["IDENTITY"] = 0] = "IDENTITY";
    choice[choice["INVERSE"] = 1] = "INVERSE";
    choice[choice["ELEMENT"] = 2] = "ELEMENT";
})(choice || (choice = {}));
function generateKeys(length, size) {
    const publicKey = (0, permutation_1.generateSet)(length, size);
    const privateTuple = Array(size);
    for (let i = 0; i < size; i++) {
        let rand = Math.random() * 3;
        if (rand < 1) {
            privateTuple[i] = choice.ELEMENT;
        }
        else if (rand < 2) {
            privateTuple[i] = choice.INVERSE;
        }
        else {
            privateTuple[i] = choice.IDENTITY;
        }
    }
    let privateKey = (0, permutation_1.identity)(length);
    publicKey.forEach((element, index) => {
        if (privateTuple[index] === choice.ELEMENT) {
            privateKey = (0, permutation_1.multiply)(privateKey, element);
        }
        else if (privateTuple[index] === choice.INVERSE) {
            privateKey = (0, permutation_1.multiply)(privateKey, (0, permutation_1.inverse)(element));
        }
    });
    return { publicKey, privateTuple, privateKey };
}
exports.generateKeys = generateKeys;
function conjugateKey(publicKey, privateKey) {
    let conjugatedKey = Array(publicKey.length);
    publicKey.forEach((element, index) => {
        conjugatedKey[index] = (0, permutation_1.conjugate)(privateKey, element);
    });
    return conjugatedKey;
}
exports.conjugateKey = conjugateKey;
function generateSharedKey(conjugatedKey, privateTuple, privateKey, alice) {
    let commutator = (0, permutation_1.identity)(privateKey.length);
    conjugatedKey.forEach((element, index) => {
        if (privateTuple[index] === choice.ELEMENT) {
            commutator = (0, permutation_1.multiply)(commutator, element);
        }
        else if (privateTuple[index] === choice.INVERSE) {
            commutator = (0, permutation_1.multiply)(commutator, (0, permutation_1.inverse)(element));
        }
    });
    if (alice) {
        commutator = (0, permutation_1.multiply)((0, permutation_1.inverse)(privateKey), commutator);
    }
    else {
        commutator = (0, permutation_1.inverse)((0, permutation_1.multiply)((0, permutation_1.inverse)(privateKey), commutator));
    }
    return commutator;
}
exports.generateSharedKey = generateSharedKey;
