
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import { Product } from './product';


@Injectable()
export class ProductService
{
    constructor(private api: ApiService,
        private authService: AuthorizationService,
        private router: Router)
    {        
    }

    public getAll(): Observable<Product[]>
    {
        return this.api.get<Product[]>('products');
    }

    public getAllAdmin(): Observable<Product[]>
    {
        return this.api.get<Product[]>('products/admin');
    }
    
    public getProduct(productnaam): Observable<Product[]>{
        if(productnaam == null) {
            return null;
        }
        return this.api.get<Product[]>('products/' + productnaam);
    }

    public buyProduct(product: Product) {
        let data = {
            productName: product.productName,
            price: product.price,
            description: product.description,
            available: (product.available-1)
        };

        this.api.put<void>("products", data).subscribe(
            data => {
                product.available = product.available-1
                this.api.post<void>("carts/addProduct", null  ,"?productName=" + product.productName).subscribe( data => {
                    
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
}