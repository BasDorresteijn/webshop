
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MatButtonModule} from '@angular/material/button';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import { Cart } from './cart';
import { User } from '../user/user';
import { Product } from '../product/product';
import { error } from 'util';
import { isPromise } from '@angular/core/src/util/lang';
import { EventEmitter } from '@angular/core';

@Injectable()
export class CartService
{
    private user?: User;
    private totalPrice: Number;

    private updateViews: EventEmitter<null>;

    constructor(private api: ApiService, private autorizationService: AuthorizationService, private router: Router) {
        this.user = this.autorizationService.getAuthenticator()
        this.updateViews = new EventEmitter();
    }

    public getCart(): Observable<Cart[]>{
        this.user = this.autorizationService.getAuthenticator()
        return this.api.get<Cart[]>('carts/' + this.user.fullName);
    }

    public removeProductFromCart(product : Product) {
        this.api.delete("carts", "?productName=" + product.productName).subscribe(
            data => {
                this.updateViews.emit()
            },
            error => {

            }
        )
    }

    public unbuyProduct(product: Product) {
        let data = {
            productName: product.productName,
            price: product.price,
            description: product.description,
            available: (product.available+1)
        };

        this.api.put<void>("products", data, "?productname=" + product.productName).subscribe(
            data => {
                this.updateViews.emit()
            },
            error => {
                alert("Je moet ingelogd zijn om een product te kopen")
            }
        );
    }

    public getTotalPrice() {
        return this.api.get<number>("carts/price");
    }

    public emptycart() {
        this.api.delete<void>("carts/remove").subscribe(
            data => {
                this.updateViews.emit()
            }
        );
    }

    public paycart() {
        this.api.delete<void>("carts/buy").subscribe( 
            data => {
                this.updateViews.emit()
            }
        )
    }

    public goHome() {
        this.router.navigate([''])
    }

    public getUpdateViews() : EventEmitter<null> {
        return this.updateViews;
    }
}