System.register(["@angular/core", "./list.datasource", "../product.service"], function (exports_1, context_1) {
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
    var core_1, list_datasource_1, product_service_1, ProductListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (list_datasource_1_1) {
                list_datasource_1 = list_datasource_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            }
        ],
        execute: function () {
            ProductListComponent = /** @class */ (function () {
                function ProductListComponent(productService) {
                    this.productService = productService;
                    this.displayedColumns = ['productname', 'price', 'description', 'available', 'soldAmount'];
                    this.dataSource = null;
                    this.getProductList();
                }
                ProductListComponent.prototype.getProductList = function () {
                    var _this = this;
                    this.productService.getAllAdmin().subscribe(function (producten) {
                        _this.dataSource = new list_datasource_1.ListDataSource(producten);
                    });
                };
                ProductListComponent.prototype.hasData = function () {
                    return this.dataSource !== null;
                };
                ProductListComponent = __decorate([
                    core_1.Component({
                        selector: 'product-list',
                        templateUrl: 'app/product/productlist/list.component.html',
                        styleUrls: ['app/product/productlist/list.component.css'],
                    }),
                    __metadata("design:paramtypes", [product_service_1.ProductService])
                ], ProductListComponent);
                return ProductListComponent;
            }());
            exports_1("ProductListComponent", ProductListComponent);
        }
    };
});
//# sourceMappingURL=list.component.js.map