System.register(["@angular/core", "../product.service", "@angular/forms"], function (exports_1, context_1) {
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
    var core_1, product_service_1, forms_1, EditProductComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            EditProductComponent = /** @class */ (function () {
                function EditProductComponent(productService) {
                    this.productService = productService;
                    this.product = productService.getSelectedProduct();
                    this.productName = this.product.productName;
                    this.editProductForm = new forms_1.FormGroup({
                        productName: new forms_1.FormControl(null, [
                            forms_1.Validators.required
                        ]),
                        price: new forms_1.FormControl(null, [
                            forms_1.Validators.required
                        ]),
                        description: new forms_1.FormControl(),
                        available: new forms_1.FormControl(null, [
                            forms_1.Validators.required
                        ])
                    });
                }
                EditProductComponent.prototype.ngOnInit = function () {
                };
                ;
                EditProductComponent.prototype.nullValidator = function (control) {
                    if (control.value != null) {
                        return { valid: false };
                    }
                    return null;
                };
                EditProductComponent.prototype.editProduct = function () {
                    this.product.price = Math.round(this.product.price * 100) / 100;
                    this.product.available = Math.round(this.product.available);
                    this.productService.update(this.productName, this.product);
                };
                EditProductComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-product',
                        templateUrl: 'app/product/editproduct/editproduct.component.html',
                        styleUrls: ['app/product/editproduct/editproduct.component.css'],
                    }),
                    __metadata("design:paramtypes", [product_service_1.ProductService])
                ], EditProductComponent);
                return EditProductComponent;
            }());
            exports_1("EditProductComponent", EditProductComponent);
        }
    };
});
//# sourceMappingURL=editproduct.component.js.map