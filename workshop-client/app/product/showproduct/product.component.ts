
import { Component } from '@angular/core';

import { Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Observable } from 'rxjs/Observable';
import { Directive } from '@angular/core'


@Component({
    selector: 'product',
    templateUrl: 'app/product/showproduct/product.component.html',
    styleUrls: ['app/product/showproduct/product.component.css'],
})
export class ProductComponent
{ 
    producten: Product[];

    constructor(private service: ProductService) {
        this.getProducten()
    }

    ngOnInit() {
        
    }

    public getProducten() {
        this.service.getAll().subscribe(
            data => {
                this.producten = data;                
            }
        );
    }

    public hasdata(){
        return this.producten!==null
    }

    public buyProduct(product: Product) {
        this.service.buyProduct(product)
    }
}
