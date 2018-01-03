
import { Component } from '@angular/core';

import { ListDataSource } from './list.datasource';
import { ProductService } from '../product.service';

import { Product } from '../product'

@Component({
    selector: 'product-list',
    templateUrl: 'app/product/productlist/list.component.html',
    styleUrls: ['app/product/productlist/list.component.css'],
})
export class ProductListComponent
{
    public displayedColumns = ['productname', 'price', 'description', 'available', 'soldAmount'];
    public dataSource = null;
    private selectedproduct?: Product;
    private selectedproductName?: String;
    
    constructor(private productService : ProductService)
    {
        this.getProductList();
    }

    ngOnInit() {
        // this.productService.getUpdateViews().subscribe( () => this.getProductList())
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

    private selectRow(product: Product) {
        this.selectedproduct = product;
        this.selectedproductName = product.productName;
    }

    private editProduct() {
        this.productService.editProduct(this.selectedproduct)
    }

    private deleteProduct() {
        this.productService.removeProduct(this.selectedproduct)
    }

    private showButtons() {
        return this.selectedproduct != null
    }
}
