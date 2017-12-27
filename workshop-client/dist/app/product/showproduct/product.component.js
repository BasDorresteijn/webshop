System.register(["@angular/core", "../product.service"], function (exports_1, context_1) {
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
    var core_1, product_service_1, ProductComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            }
        ],
        execute: function () {
            ProductComponent = /** @class */ (function () {
                function ProductComponent(service) {
                    this.service = service;
                    this.getProducten();
                }
                ProductComponent.prototype.ngOnInit = function () {
                };
                ProductComponent.prototype.getProducten = function () {
                    var _this = this;
                    this.service.getAll().subscribe(function (data) {
                        _this.producten = data;
                    });
                };
                ProductComponent.prototype.hasdata = function () {
                    return this.producten !== null;
                };
                ProductComponent.prototype.buyProduct = function (product) {
                    this.service.buyProduct(product);
                };
                ProductComponent = __decorate([
                    core_1.Component({
                        selector: 'product',
                        templateUrl: 'app/product/showproduct/product.component.html',
                        styleUrls: ['app/product/showproduct/product.component.css'],
                    }),
                    __metadata("design:paramtypes", [product_service_1.ProductService])
                ], ProductComponent);
                return ProductComponent;
            }());
            exports_1("ProductComponent", ProductComponent);
        }
    };
});
//# sourceMappingURL=product.component.js.map