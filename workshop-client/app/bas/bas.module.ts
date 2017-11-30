
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { BasComponent } from './bas.component';

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ BasComponent ]
})
export class BasModule { }
