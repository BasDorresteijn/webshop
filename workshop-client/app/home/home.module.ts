
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { HomeComponent } from './home.component';
import { ProductModule } from '../product/product.module';

@NgModule({
    imports: [ PublicModule, UserModule, ProductModule],
    declarations: [ HomeComponent ]
})
export class HomeModule { }
