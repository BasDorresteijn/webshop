
import { Component } from '@angular/core';

import { ListDataSource } from './list.datasource';
import { ProductService } from '../product.service';

@Component({
    selector: 'product-list',
    templateUrl: 'app/product/productlist/list.component.html',
    styleUrls: ['app/product/productlist/list.component.css'],
})
export class ProductListComponent
{
    public displayedColumns = ['productname', 'price', 'description', 'available', 'soldAmount'];
    public dataSource = null;
    
    constructor(private productService : ProductService)
    {
        this.getProductList();
    }
    
    private getProductList()
    {
        this.productService.getAllAdmin().subscribe(
            producten =>
            {
                this.dataSource = new ListDataSource(producten);
            }
        );
    }
    
    public hasData()
    {
        return this.dataSource !== null;
    }
}
