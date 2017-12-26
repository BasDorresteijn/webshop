System.register(["@angular/cdk/collections", "rxjs/Observable", "rxjs/add/observable/of"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var collections_1, Observable_1, ListDataSource;
    return {
        setters: [
            function (collections_1_1) {
                collections_1 = collections_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            ListDataSource = /** @class */ (function (_super) {
                __extends(ListDataSource, _super);
                function ListDataSource(producten) {
                    var _this = _super.call(this) || this;
                    _this.producten = producten;
                    return _this;
                }
                ListDataSource.prototype.connect = function () {
                    return Observable_1.Observable.of(this.producten);
                };
                ListDataSource.prototype.disconnect = function () { };
                return ListDataSource;
            }(collections_1.DataSource));
            exports_1("ListDataSource", ListDataSource);
        }
    };
});
//# sourceMappingURL=list.datasource.js.map