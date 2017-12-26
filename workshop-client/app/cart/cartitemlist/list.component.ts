
import { Component } from '@angular/core';

import { ListDataSource } from './list.datasource';
import { CartService } from '../cart.service';
import { Product } from '../../product/product';
import { Cart } from '../cart';

@Component({
    selector: 'cart-product-list',
    templateUrl: 'app/cart/cartitemlist/list.component.html',
    styleUrls: ['app/cart/cartitemlist/list.component.css'],
})
export class CartListComponent
{
    public displayedColumns = ['productname', 'price', 'description', 'removeProduct'];
    public dataSource = null;
    private cart : Cart;
    
    constructor(private cartService : CartService)
    {
        this.getProductList();
    }
    
    private getProductList()
    {
        this.cartService.getCart().subscribe(
            data => {
                this.cart = <Cart> data;
                console.log(this.cart)
                this.dataSource = new ListDataSource(this.cart.products);
            }
        );
    }
    
    public hasData()
    {
        return this.dataSource !== null;
    }

    public removeItem(product : Product) {
        this.cartService
    }
}
