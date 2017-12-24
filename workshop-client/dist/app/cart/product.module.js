System.register(["@angular/core", "../public.module", "../user/user.module", "./showproduct/product.component", "./productlist/list.component", "./product.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, public_module_1, user_module_1, product_component_1, list_component_1, product_service_1, ProductModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (public_module_1_1) {
                public_module_1 = public_module_1_1;
            },
            function (user_module_1_1) {
                user_module_1 = user_module_1_1;
            },
            function (product_component_1_1) {
                product_component_1 = product_component_1_1;
            },
            function (list_component_1_1) {
                list_component_1 = list_component_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            }
        ],
        execute: function () {
            ProductModule = /** @class */ (function () {
                function ProductModule() {
                }
                ProductModule = __decorate([
                    core_1.NgModule({
                        imports: [public_module_1.PublicModule, user_module_1.UserModule],
                        declarations: [product_component_1.ProductComponent, list_component_1.ProductListComponent],
                        exports: [product_component_1.ProductComponent, list_component_1.ProductListComponent],
                        providers: [product_service_1.productService]
                    })
                ], ProductModule);
                return ProductModule;
            }());
            exports_1("ProductModule", ProductModule);
        }
    };
});
//# sourceMappingURL=product.module.js.map