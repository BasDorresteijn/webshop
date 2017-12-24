
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/list/list.component';
import { ProductListComponent } from './product/productlist/list.component'
import { CartComponent } from './cart/showcart/cart.component';

export const routes: Routes =
[
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent },
    { path: 'products', component: ProductListComponent}
    { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
