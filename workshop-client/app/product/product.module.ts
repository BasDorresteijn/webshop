
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { ProductComponent } from './product.component';
import { Input } from '@angular/core';

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ ProductComponent ],
    exports: [ ProductComponent ],
})
export class ProductModule { 
}
