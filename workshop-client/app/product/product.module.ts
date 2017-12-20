
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { ProductComponent } from './showproduct/product.component'
import { Input } from '@angular/core';
import { productService } from './product.service';

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ ProductComponent ],
    exports: [ ProductComponent ],
    providers: [ productService ]
})
export class ProductModule { 
}
