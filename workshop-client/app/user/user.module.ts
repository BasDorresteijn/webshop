
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';

import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './list/list.component';
import { EditUserComponent } from './edit/edituser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ PublicModule, SharedModule, FormsModule, ReactiveFormsModule],
    exports: [ LoginComponent, EditUserComponent ],
    declarations: [ RegisterComponent, LoginComponent, UserListComponent, EditUserComponent],
    providers: [ UserService ]
})
export class UserModule { }
