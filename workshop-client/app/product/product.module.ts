
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { ProductComponent } from './showproduct/product.component'
import { ProductListComponent } from './productlist/list.component'
import { Input } from '@angular/core';
import { ProductService } from './product.service';
import { AddProductComponent } from './addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditProductComponent } from './editproduct/editproduct.component';

@NgModule({
    imports: [ PublicModule, UserModule, FormsModule, ReactiveFormsModule ],
    declarations: [ ProductComponent, ProductListComponent, AddProductComponent, EditProductComponent ],
    exports: [ ProductComponent, ProductListComponent, AddProductComponent, EditProductComponent ],
    providers: [ ProductService ]
})
export class ProductModule { 
}
