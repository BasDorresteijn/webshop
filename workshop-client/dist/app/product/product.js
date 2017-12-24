System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Product;
    return {
        setters: [],
        execute: function () {
            Product = /** @class */ (function () {
                function Product(productName, price, description, available, soldAmount) {
                    this.productName = productName;
                    this.price = price;
                    this.description = description;
                    this.available = available;
                    this.soldAmount = soldAmount;
                }
                return Product;
            }());
            exports_1("Product", Product);
        }
    };
});
//# sourceMappingURL=product.js.map