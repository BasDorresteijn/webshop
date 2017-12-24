export class Cart
{
    constructor(
        public productName?: String,
        public price?: number,
        public description?: String,
        public available?: number,
        public soldAmount?: number,
    ) {

    }
}