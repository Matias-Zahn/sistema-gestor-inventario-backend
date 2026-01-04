import { CustomError } from "../../errors/customError"

export class SellProductDTO{

    constructor(
        public readonly term: string,
        public readonly quantity: number
    ){}


    public static create( object: {[key:string]: any } ): [string?, SellProductDTO?] {

        if(!object) return ['Missing quantity']

        //Parse para numero 
        const quantity = +object.quantity
        const term = object.term;

        if(quantity <= 0) return ['Quantity must be greater than 0']

        if(isNaN( Number(quantity) )) return ['Quantity must be a number']

        //Esta validacion sirve para que no envien floats
        if(!Number.isInteger(quantity)) return ['Quantity must be an integer']

        return [undefined, new SellProductDTO(term, quantity)]
    }


}