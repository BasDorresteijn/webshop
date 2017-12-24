System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var product;
    return {
        setters: [],
        execute: function () {
            product = /** @class */ (function () {
                function product(productName, price, description, available, soldAmount) {
                    this.productName = productName;
                    this.price = price;
                    this.description = description;
                    this.available = available;
                    this.soldAmount = soldAmount;
                }
                return product;
            }());
            exports_1("product", product);
        }
    };
});
//# sourceMappingURL=product.js.map