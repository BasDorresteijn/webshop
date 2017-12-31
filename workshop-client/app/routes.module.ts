
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/list/list.component';
import { ProductListComponent } from './product/productlist/list.component'
import { CartComponent } from './cart/showcart/cart.component';
import { AddProductComponent } from './product/addproduct/addproduct.component';
import { EditProductComponent } from './product/editproduct/editproduct.component';
import { EditUserComponent } from './user/edit/edituser.component';

export const routes: Routes =
[
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent },
    { path: 'products', component: ProductListComponent},
    { path: 'products/add', component: AddProductComponent},
    { path: 'products/edit', component: EditProductComponent},
    { path: 'cart', component: CartComponent},
    { path: 'me', component: EditUserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
