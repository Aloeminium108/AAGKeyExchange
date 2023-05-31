"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = exports.NonabelianGroup = void 0;
class NonabelianGroup {
    constructor(length, size, element, options) {
        this.set = Array(size);
    }
}
exports.NonabelianGroup = NonabelianGroup;
class Element {
    constructor(length) {
        this.length = length;
    }
}
exports.Element = Element;
