
import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'edit-user',
    templateUrl: 'app/user/edit/edituser.component.html',
    styleUrls: ['app/user/edit/edituser.component.css'],
})
export class EditUserComponent
{
    user?: User;
    editUserForm: FormGroup;
    readOnly: boolean = true;

    constructor(private userService : UserService)
    {
        this.user = <User>this.userService.getAuth();
        this.editUserForm = new FormGroup({
            fullName: new FormControl(null, [
                Validators.required,]),
            postcode: new FormControl(null, [
                Validators.required]),
            streetnumber: new FormControl(null, [
                Validators.required]),
            emailAddress: new FormControl(null, [
                Validators.required]),    
        });
    }

    ngOnInit() {

    };

    nullValidator(control: AbstractControl) {
        if (control.value != null) {
            return {valid: false }
        }
        return null
    }


    editUser()
    {
        this.userService.putUser(this.user)
    }

    deleteaccount()
    {
        this.userService.deleteAccount();
    }
}
