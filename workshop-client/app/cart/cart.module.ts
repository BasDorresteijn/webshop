
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';
import { CartComponent } from './showcart/cart.component';
import { CartService } from './cart.service';
import { CartListComponent } from './cartitemlist/list.component';

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ CartComponent, CartListComponent ],
    exports: [ CartComponent, CartListComponent ],
    providers: [ CartService ]
})
export class CartModule { 
}
