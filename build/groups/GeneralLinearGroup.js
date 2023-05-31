"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = exports.GeneralLinearGroup = void 0;
const NonabelianGroup_1 = require("./NonabelianGroup");
class GeneralLinearGroup extends NonabelianGroup_1.NonabelianGroup {
    constructor(length, size, element, options) {
        super(length, size, element);
        Matrix.setField(options.field);
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
exports.GeneralLinearGroup = GeneralLinearGroup;
class Matrix extends NonabelianGroup_1.Element {
    constructor(length) {
        super(length);
        this.representation = () => this.vector;
        this.random = () => {
            let rand = new Matrix(this.vector.length);
            // TODO Implement random matrix function
            return rand;
        };
        this.equals = (y) => {
            if (this === y)
                return true;
            if (this.vector.length !== y.vector.length)
                return false;
            for (let i = 0; i < this.vector.length; i++) {
                if (this.vector[i].length !== y.vector[i].length)
                    return false;
                for (let j = 0; j < this.vector[i].length; i++) {
                    if (this.vector[i][j] !== y.vector[i][j])
                        return false;
                }
            }
            return true;
        };
        this.inverse = () => {
            let inverse = new Matrix(this.vector.length);
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
            return inverse;
        };
        this.multiply = (y) => {
            let product = new Matrix(this.vector.length);
            // TODO Test matrix multiply function
            for (let i = 0; i < this.length; i++) {
                for (let j = 0; j < this.length; j++) {
                    product.vector[i][j] = dotProduct(this.row(i), y.column(j), Matrix.field);
                }
            }
            return product;
        };
        this.conjugate = (y) => {
            const invX = this.inverse();
            return invX.multiply(y.multiply(this));
        };
        this.commute = (y) => {
            const invX = this.inverse();
            const invY = y.inverse();
            return invX.multiply(invY.multiply(this.multiply(y)));
        };
        this.determinant = () => {
            // TODO implement Matrix determinant function
            return 0;
        };
        this.row = (index) => {
            return this.vector[index];
        };
        this.column = (index) => {
            let column = [];
            for (let i = 0; i < this.length; i++) {
                column.push(this.vector[i][index]);
            }
            return column;
        };
        let e = [];
        for (let i = 0; i < length; i++) {
            let column = [];
            for (let j = 0; j < length; j++) {
                const entry = i == j ?
                    1 : 0;
                column.push(entry);
            }
            e.push(column);
        }
        this.vector = e;
    }
    static setField(field) {
        Matrix.field = field;
    }
}
exports.Matrix = Matrix;
function dotProduct(row, column, modulus) {
    let sum = 0;
    for (let i = 0; i < row.length; i++) {
        sum += (row[i] * column[i]) % modulus;
    }
    return sum % modulus;
}
