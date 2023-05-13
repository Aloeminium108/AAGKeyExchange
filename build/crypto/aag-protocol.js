"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AAGProtocol = void 0;
class AAGProtocol {
    constructor(length, size, group, element) {
        this.conjugateKey = (publicKey) => {
            let conjugatedKey = Array(publicKey.set.length);
            publicKey.set.forEach((element, index) => {
                conjugatedKey[index] = this.privateKey.conjugate(element);
            });
            return conjugatedKey;
        };
        this.publicKey = new group(length, size, element);
        this.privateTuple = Array(size);
        for (let i = 0; i < size; i++) {
            let rand = Math.random() * 3;
            if (rand < 1) {
                this.privateTuple[i] = choice.ELEMENT;
            }
            else if (rand < 2) {
                this.privateTuple[i] = choice.INVERSE;
            }
            else {
                this.privateTuple[i] = choice.IDENTITY;
            }
        }
        this.privateKey = new element(length);
        this.publicKey.set.forEach((element, index) => {
            if (this.privateTuple[index] === choice.ELEMENT) {
                this.privateKey = this.privateKey.multiply(element);
            }
            else if (this.privateTuple[index] === choice.INVERSE) {
                this.privateKey = this.privateKey.multiply(element.inverse());
            }
        });
    }
    generateSharedKey(conjugatedKey, element, alice) {
        let commutator = new element(this.privateKey.length);
        conjugatedKey.forEach((element, index) => {
            if (this.privateTuple[index] === choice.ELEMENT) {
                commutator = commutator.multiply(element);
            }
            else if (this.privateTuple[index] === choice.INVERSE) {
                commutator = commutator.multiply(element.inverse());
            }
        });
        if (alice) {
            commutator = this.privateKey.inverse().multiply(commutator);
        }
        else {
            commutator = this.privateKey.inverse().multiply(commutator).inverse();
        }
        return commutator;
    }
}
exports.AAGProtocol = AAGProtocol;
var choice;
(function (choice) {
    choice[choice["IDENTITY"] = 0] = "IDENTITY";
    choice[choice["INVERSE"] = 1] = "INVERSE";
    choice[choice["ELEMENT"] = 2] = "ELEMENT";
})(choice || (choice = {}));
