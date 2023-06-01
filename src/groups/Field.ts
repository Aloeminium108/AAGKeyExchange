/* 

  From a group-theoretic perspective, 
  a field is essentially two abelien groups over the same set 
  in which one of the binary operations distributes over the other

*/

import { FieldElement } from "./Element";

export abstract class Field<E extends FieldElement<any>> {

  constructor(options: object) {
    
  }

}