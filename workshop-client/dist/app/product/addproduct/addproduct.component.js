System.register(["@angular/core", "../product", "../product.service", "@angular/forms"], function (exports_1, context_1) {
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
    var core_1, product_1, product_service_1, forms_1, AddProductComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (product_1_1) {
                product_1 = product_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            AddProductComponent = /** @class */ (function () {
                function AddProductComponent(productService) {
                    this.productService = productService;
                    this.product = new product_1.Product();
                    this.addProductForm = new forms_1.FormGroup({
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
                AddProductComponent.prototype.ngOnInit = function () {
                    // this.addProductForm = new FormGroup({
                    //     productName: new FormControl(null, [
                    //         Validators.required]),
                    //     price : new FormControl(null, [
                    //         Validators.required]),
                    //     description : new FormControl(),
                    //     available : new FormControl(null, [
                    //         Validators.required])
                    // });
                };
                ;
                AddProductComponent.prototype.nullValidator = function (control) {
                    if (control.value != null) {
                        return { valid: false };
                    }
                    return null;
                };
                AddProductComponent.prototype.createProduct = function () {
                    this.product.price = Math.round(this.product.price * 100) / 100;
                    this.product.available = Math.round(this.product.available);
                    this.productService.create(this.product);
                };
                AddProductComponent = __decorate([
                    core_1.Component({
                        selector: 'create-product',
                        templateUrl: 'app/product/addproduct/addproduct.component.html',
                        styleUrls: ['app/product/addproduct/addproduct.component.css'],
                    }),
                    __metadata("design:paramtypes", [product_service_1.ProductService])
                ], AddProductComponent);
                return AddProductComponent;
            }());
            exports_1("AddProductComponent", AddProductComponent);
        }
    };
});
//# sourceMappingURL=addproduct.component.js.map