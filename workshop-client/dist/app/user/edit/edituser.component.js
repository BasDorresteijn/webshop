System.register(["@angular/core", "../user.service", "@angular/forms"], function (exports_1, context_1) {
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
    var core_1, user_service_1, forms_1, EditUserComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            EditUserComponent = /** @class */ (function () {
                function EditUserComponent(userService) {
                    this.userService = userService;
                    this.readOnly = true;
                    this.user = this.userService.getAuth();
                    this.editUserForm = new forms_1.FormGroup({
                        fullName: new forms_1.FormControl(null, [
                            forms_1.Validators.required,
                        ]),
                        postcode: new forms_1.FormControl(null, [
                            forms_1.Validators.required
                        ]),
                        streetnumber: new forms_1.FormControl(null, [
                            forms_1.Validators.required
                        ]),
                        emailAddress: new forms_1.FormControl(null, [
                            forms_1.Validators.required
                        ]),
                    });
                }
                EditUserComponent.prototype.ngOnInit = function () {
                };
                ;
                EditUserComponent.prototype.nullValidator = function (control) {
                    if (control.value != null) {
                        return { valid: false };
                    }
                    return null;
                };
                EditUserComponent.prototype.editUser = function () {
                    this.userService.putUser(this.user);
                };
                EditUserComponent.prototype.deleteaccount = function () {
                    this.userService.deleteAccount();
                };
                EditUserComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-user',
                        templateUrl: 'app/user/edit/edituser.component.html',
                        styleUrls: ['app/user/edit/edituser.component.css'],
                    }),
                    __metadata("design:paramtypes", [user_service_1.UserService])
                ], EditUserComponent);
                return EditUserComponent;
            }());
            exports_1("EditUserComponent", EditUserComponent);
        }
    };
});
//# sourceMappingURL=edituser.component.js.map