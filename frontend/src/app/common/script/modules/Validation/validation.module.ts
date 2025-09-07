import { IntrValidation } from "./Validation.interface";


export class ValidationModule {
    constructor() {

    }

    checkValidation(): IntrValidation  {
        return {
            isValid: true,
            message: 'Неправильный email',
        };
    }
}

