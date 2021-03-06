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
    var core_1, router_1, api_service_1, authorization_service_1, core_2, ProductService;
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
            ProductService = /** @class */ (function () {
                function ProductService(api, authService, router) {
                    this.api = api;
                    this.authService = authService;
                    this.router = router;
                    this.updateViews = new core_2.EventEmitter();
                }
                ProductService.prototype.getUpdateViews = function () {
                    return this.updateViews;
                };
                ProductService.prototype.getAll = function () {
                    // this.updateViews.emit();
                    return this.api.get('products');
                };
                ProductService.prototype.getAllAdmin = function () {
                    // this.updateViews.emit();
                    return this.api.get('products/admin');
                };
                ProductService.prototype.getProduct = function (productnaam) {
                    if (productnaam == null) {
                        return null;
                    }
                    return this.api.get('products/' + productnaam);
                };
                ProductService.prototype.editProduct = function (product) {
                    this.selectedProduct = product;
                    this.router.navigate(["products/edit"]);
                };
                ProductService.prototype.getSelectedProduct = function () {
                    return this.selectedProduct;
                };
                ProductService.prototype.buyProduct = function (product) {
                    var _this = this;
                    var data = {
                        productName: product.productName,
                        price: product.price,
                        description: product.description,
                        available: (product.available - 1)
                    };
                    this.api.put("products/buy", data, "?productname=" + product.productName).subscribe(function (data) {
                        product.available = product.available - 1;
                        _this.api.post("carts/addProduct", null, "?productName=" + product.productName).subscribe(function (data) {
                            // this.updateViews.emit();
                        }, function (error) {
                            alert("Er is iets fout gegaan");
                        });
                    }, function (error) {
                        alert("Je moet ingelogd zijn om een product te kopen");
                    });
                };
                ProductService.prototype.create = function (product) {
                    var _this = this;
                    var data = {
                        productName: product.productName,
                        price: product.price.toFixed(2),
                        description: product.description,
                        available: product.available
                    };
                    this.api.post("products", data).subscribe(function (data) {
                        _this.router.navigate(["/products"]);
                        // this.updateViews.emit();
                    }, function (error) {
                        alert("Er is iets fout gegaan.");
                    });
                };
                ProductService.prototype.update = function (productname, product) {
                    var _this = this;
                    var data = {
                        productName: product.productName,
                        price: product.price.toFixed(2),
                        description: product.description,
                        available: product.available
                    };
                    this.api.put("products", data, "?productname=" + productname).subscribe(function (data) {
                        // this.updateViews.emit();
                        _this.router.navigate(["/products"]);
                    }, function (error) {
                        alert("Er is iets fout gegaan.");
                    });
                };
                ProductService.prototype.removeProduct = function (product) {
                    var _this = this;
                    this.api.delete("products/" + product.productName).subscribe(function (data) {
                        _this.updateViews.emit();
                    });
                };
                ProductService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [api_service_1.ApiService,
                        authorization_service_1.AuthorizationService,
                        router_1.Router])
                ], ProductService);
                return ProductService;
            }());
            exports_1("ProductService", ProductService);
        }
    };
});
//# sourceMappingURL=product.service.js.map