
import { Component } from '@angular/core';

import { Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Directive } from '@angular/core'

import { CartService } from '../cart.service'
import { Cart } from '../cart';


@Component({
    selector: 'cart',
    templateUrl: 'app/cart/showcart/cart.component.html',
    styleUrls: ['app/cart/showcart/cart.component.css'],
})
export class CartComponent
{ 
    private cart: Cart

    constructor(private cartService: CartService) {
        this.getCart()
    }

    ngOnInit() {
        this.cartService.getUpdateViews().subscribe( () => this.getCart())
    }
    
    public getCart() {
        this.cartService.getCart().subscribe(
            data => {
                this.cart = <Cart> data;
            }
        )
    }

}
