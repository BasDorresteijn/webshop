System.register(["@angular/core", "@angular/router", "../shared/api.service", "../shared/authorization.service"], function (exports_1, context_1) {
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
    var core_1, router_1, api_service_1, authorization_service_1, core_2, CartService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (authorization_service_1_1) {
                authorization_service_1 = authorization_service_1_1;
            }
        ],
        execute: function () {
            CartService = /** @class */ (function () {
                function CartService(api, autorizationService, router) {
                    this.api = api;
                    this.autorizationService = autorizationService;
                    this.router = router;
                    this.user = this.autorizationService.getAuthenticator();
                    this.updateViews = new core_2.EventEmitter();
                }
                CartService.prototype.getCart = function () {
                    this.user = this.autorizationService.getAuthenticator();
                    return this.api.get('carts/' + this.user.fullName);
                };
                CartService.prototype.removeProductFromCart = function (product) {
                    var _this = this;
                    this.api.delete("carts", "?productName=" + product.productName).subscribe(function (data) {
                        _this.updateViews.emit();
                    }, function (error) {
                    });
                };
                CartService.prototype.unbuyProduct = function (product) {
                    var _this = this;
                    var data = {
                        productName: product.productName,
                        price: product.price,
                        description: product.description,
                        available: (product.available + 1)
                    };
                    this.api.put("products", data, "?productname=" + product.productName).subscribe(function (data) {
                        _this.updateViews.emit();
                    }, function (error) {
                        alert("Je moet ingelogd zijn om een product te kopen");
                    });
                };
                CartService.prototype.getTotalPrice = function () {
                    return this.api.get("carts/price");
                };
                CartService.prototype.emptycart = function () {
                    var _this = this;
                    this.api.delete("carts/remove").subscribe(function (data) {
                        _this.updateViews.emit();
                    });
                };
                CartService.prototype.paycart = function () {
                    var _this = this;
                    this.api.delete("carts/buy").subscribe(function (data) {
                        _this.updateViews.emit();
                    });
                };
                CartService.prototype.goHome = function () {
                    this.router.navigate(['']);
                };
                CartService.prototype.getUpdateViews = function () {
                    return this.updateViews;
                };
                CartService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [api_service_1.ApiService, authorization_service_1.AuthorizationService, router_1.Router])
                ], CartService);
                return CartService;
            }());
            exports_1("CartService", CartService);
        }
    };
});
//# sourceMappingURL=cart.service.js.map