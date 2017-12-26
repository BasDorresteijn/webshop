import { User } from "../user/user";
import { Product } from "../product/product";

export class Cart
{
    constructor(
        public user?: User,
        public products?: Array<Product>
    ) {

    }
}