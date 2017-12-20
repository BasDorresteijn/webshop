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
    var core_1, router_1, api_service_1, authorization_service_1, productService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
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
            productService = /** @class */ (function () {
                function productService(api, authService, router) {
                    this.api = api;
                    this.authService = authService;
                    this.router = router;
                }
                productService.prototype.getAll = function () {
                    return this.api.get('products');
                };
                productService.prototype.getProduct = function (productnaam) {
                    if (productnaam == null) {
                        return null;
                    }
                    return this.api.get('products/' + productnaam);
                };
                productService.prototype.updateProduct = function (product) {
                    var data = {
                        productName: product.productName,
                        price: product.price,
                        description: product.description,
                        available: (product.available - 1)
                    };
                    this.api.put("products", data).subscribe(function (data) {
                        product.available = product.available - 1;
                    }, function (error) {
                        alert("Je moet ingelogd zijn om een product te kopen");
                    });
                };
                productService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [api_service_1.ApiService,
                        authorization_service_1.AuthorizationService,
                        router_1.Router])
                ], productService);
                return productService;
            }());
            exports_1("productService", productService);
        }
    };
});
//# sourceMappingURL=product.service.js.map