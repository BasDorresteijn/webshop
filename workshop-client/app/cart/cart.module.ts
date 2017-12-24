
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';
import { CartComponent } from './showcart/cart.component';
import { CartService } from './cart.service';

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ CartComponent ],
    exports: [ CartComponent ],
    providers: [ CartService ]
})
export class CartModule { 
}
