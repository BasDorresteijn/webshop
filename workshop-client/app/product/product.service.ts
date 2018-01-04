
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import { Product } from './product';
import { EventEmitter } from '@angular/core';


@Injectable()
export class ProductService
{
    private selectedProduct?: Product;
    private updateViews: EventEmitter<null>;

    constructor(private api: ApiService,
        private authService: AuthorizationService,
        private router: Router)
    {        
        this.updateViews = new EventEmitter();
    }

    public getUpdateViews() {
        return this.updateViews;
    }

    public getAll(): Observable<Product[]>
    {
        // this.updateViews.emit();
        return this.api.get<Product[]>('products');
    }

    public getAllAdmin(): Observable<Product[]>
    {
        // this.updateViews.emit();
        return this.api.get<Product[]>('products/admin');
    }
    
    public getProduct(productnaam): Observable<Product[]>{
        if(productnaam == null) {
            return null;
        }
        return this.api.get<Product[]>('products/' + productnaam);
    }

    public editProduct(product) {
        this.selectedProduct = product;
        this.router.navigate(["products/edit"])
    }

    public getSelectedProduct() {
        return this.selectedProduct
    }

    public buyProduct(product: Product) {
        let data = {
            productName: product.productName,
            price: product.price,
            description: product.description,
            available: (product.available-1)
        };

        this.api.put<void>("products/buy", data, "?productname="+product.productName).subscribe(
            data => {
                product.available = product.available-1
                this.api.post<void>("carts/addProduct", null  ,"?productName=" + product.productName).subscribe( data => {
                    // this.updateViews.emit();
                },
                error => {
                    alert("Er is iets fout gegaan")
                })
            },
            error => {
                alert("Je moet ingelogd zijn om een product te kopen")
            }
        );
    }

    public create(product : Product) {
        let data = {
            productName: product.productName,
            price: product.price.toFixed(2),
            description: product.description,
            available: product.available
        };

        this.api.post<void>("products", data).subscribe(
            data => {
                this.router.navigate(["/products"])
                // this.updateViews.emit();
            },
            error => {
                alert("Er is iets fout gegaan.")
            }
        );
    }

    public update(productname: String, product : Product) {
        let data = {
            productName: product.productName,
            price: product.price.toFixed(2),
            description: product.description,
            available: product.available
        };

        this.api.put<void>("products", data, "?productname=" + productname).subscribe(
            data => {
                // this.updateViews.emit();
                this.router.navigate(["/products"])
            },
            error => {
                alert("Er is iets fout gegaan.")
            }
        );
    }

    public removeProduct(product : Product) {
        this.api.delete<void>("products/" + product.productName).subscribe(
            data => {
                this.updateViews.emit();
            }
        )
    }
}