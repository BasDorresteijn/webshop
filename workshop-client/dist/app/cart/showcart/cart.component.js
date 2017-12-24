System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, CartComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            CartComponent = /** @class */ (function () {
                function CartComponent() {
                }
                CartComponent = __decorate([
                    core_1.Component({
                        selector: 'cart',
                        templateUrl: 'app/cart/showcart/cart.component.html',
                        styleUrls: ['app/cart/showcart/cart.component.css'],
                    })
                ], CartComponent);
                return CartComponent;
            }());
            exports_1("CartComponent", CartComponent);
        }
    };
});
//# sourceMappingURL=cart.component.js.map