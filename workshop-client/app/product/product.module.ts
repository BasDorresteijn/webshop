
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { ProductComponent } from './showproduct/product.component'
import { ProductListComponent } from './productlist/list.component'
import { Input } from '@angular/core';
import { productService } from './product.service';

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ ProductComponent, ProductListComponent ],
    exports: [ ProductComponent, ProductListComponent ],
    providers: [ productService ]
})
export class ProductModule { 
}
