
import { Component } from '@angular/core';

import { Input } from '@angular/core';
import { productService } from '../product.service';
import { product } from '../product';
import { Observable } from 'rxjs/Observable';
import { Directive } from '@angular/core'


@Component({
    selector: 'product',
    templateUrl: 'app/product/showproduct/product.component.html',
    styleUrls: ['app/product/showproduct/product.component.css'],
})
export class ProductComponent
{ 
    producten: product[];

    constructor(private service: productService) {
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

    public buyProduct(product: product) {
        this.service.updateProduct(product)
    }
}
