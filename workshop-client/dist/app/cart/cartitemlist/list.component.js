System.register(["@angular/core", "./list.datasource", "../cart.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, list_datasource_1, cart_service_1, CartListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (list_datasource_1_1) {
                list_datasource_1 = list_datasource_1_1;
            },
            function (cart_service_1_1) {
                cart_service_1 = cart_service_1_1;
            }
        ],
        execute: function () {
            CartListComponent = /** @class */ (function () {
                function CartListComponent(cartService) {
                    this.cartService = cartService;
                    this.displayedColumns = ['productname', 'price', 'description', 'removeProduct'];
                    this.dataSource = null;
                    this.totalPrice = 0;
                    this.getProductList();
                }
                CartListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.cartService.getUpdateViews().subscribe(function () { return _this.getProductList(); });
                };
                CartListComponent.prototype.getProductList = function () {
                    var _this = this;
                    this.cartService.getCart().subscribe(function (data) {
                        _this.cart = data;
                        _this.dataSource = new list_datasource_1.ListDataSource(_this.cart.products);
                        _this.getPrice();
                    });
                };
                CartListComponent.prototype.getPrice = function () {
                    var _this = this;
                    this.cartService.getTotalPrice().subscribe(function (data) {
                        _this.totalPrice = data;
                    });
                };
                CartListComponent.prototype.hasData = function () {
                    return this.dataSource !== null;
                };
                CartListComponent.prototype.removeItem = function (product) {
                    this.cartService.removeProductFromCart(product);
                    this.cartService.unbuyProduct(product);
                };
                CartListComponent.prototype.emptycart = function () {
                    // this.cartService.goHome();
                    this.cartService.emptycart();
                };
                CartListComponent.prototype.paycart = function () {
                    // this.cartService.goHome();
                    alert("Dat is dan: €" + this.totalPrice);
                    this.cartService.paycart();
                };
                CartListComponent = __decorate([
                    core_1.Component({
                        selector: 'cart-product-list',
                        templateUrl: 'app/cart/cartitemlist/list.component.html',
                        styleUrls: ['app/cart/cartitemlist/list.component.css'],
                    }),
                    __metadata("design:paramtypes", [cart_service_1.CartService])
                ], CartListComponent);
                return CartListComponent;
            }());
            exports_1("CartListComponent", CartListComponent);
        }
    };
});
//# sourceMappingURL=list.component.js.map