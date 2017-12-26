System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cart;
    return {
        setters: [],
        execute: function () {
            Cart = /** @class */ (function () {
                function Cart(user, products) {
                    this.user = user;
                    this.products = products;
                }
                return Cart;
            }());
            exports_1("Cart", Cart);
        }
    };
});
//# sourceMappingURL=cart.js.map