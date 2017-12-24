System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cart;
    return {
        setters: [],
        execute: function () {
            Cart = /** @class */ (function () {
                function Cart(productName, price, description, available, soldAmount) {
                    this.productName = productName;
                    this.price = price;
                    this.description = description;
                    this.available = available;
                    this.soldAmount = soldAmount;
                }
                return Cart;
            }());
            exports_1("Cart", Cart);
        }
    };
});
//# sourceMappingURL=cart.js.map