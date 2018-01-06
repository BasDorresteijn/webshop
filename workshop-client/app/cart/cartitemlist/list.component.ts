
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
    private totalPrice : number = 0;

    constructor(private cartService : CartService)
    {
        this.getProductList();
    }

    ngOnInit() {
        this.cartService.getUpdateViews().subscribe(() => this.getProductList())
    }
    
    private getProductList()
    {
        this.cartService.getCart().subscribe(
            data => {
                this.cart = <Cart> data;
                this.dataSource = new ListDataSource(this.cart.products);
                this.getPrice();
            }
        );
    }

    

    private getPrice() {
        this.cartService.getTotalPrice().subscribe(
            data => {
                this.totalPrice = data
            }
        )
    }
    
    public hasData()
    {
        return this.dataSource !== null;
    }

    public removeItem(product : Product) {
        this.cartService.removeProductFromCart(product)
        this.cartService.unbuyProduct(product)
    }

    public emptycart() {
        // this.cartService.goHome();
        this.cartService.emptycart();
    }

    public paycart() {
        // this.cartService.goHome();
        alert("Dat is dan: €" + this.totalPrice);
        this.cartService.paycart();
    }
}
