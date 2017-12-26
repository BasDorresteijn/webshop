
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import { Cart } from './cart';
import { User } from '../user/user';

@Injectable()
export class CartService
{
    private user: User

    constructor(private api: ApiService, private autorizationService: AuthorizationService) {
        this.user = this.autorizationService.getAuthenticator()
    }

    public getCart(): Observable<Cart[]>{
        return this.api.get<Cart[]>('carts/' + this.user.fullName);
    }

    public removeProductFromCart(product) {
        // this.api.delete<void>("cool");
    }
}