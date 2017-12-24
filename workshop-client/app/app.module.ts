
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesModule } from './routes.module';
import { PublicModule } from './public.module';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';

@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
    PublicModule,
    SharedModule,
    HomeModule,
    UserModule,
    ProductModule,
    CartModule
  ],
  exports: [ PublicModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
