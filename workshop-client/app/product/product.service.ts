
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import { product } from './product';


@Injectable()
export class productService
{
    constructor(private api: ApiService,
        private authService: AuthorizationService,
        private router: Router)
    {        
    }

    public getAll(): Observable<product[]>
    {
        return this.api.get<product[]>('products');
    }

    public getAllAdmin(): Observable<product[]>
    {
        return this.api.get<product[]>('products/admin');
    }
    
    public getProduct(productnaam): Observable<product[]>{
        if(productnaam == null) {
            return null;
        }
        return this.api.get<product[]>('products/' + productnaam);
    }

    public updateProduct(product: product) {
        let data = {
            productName: product.productName,
            price: product.price,
            description: product.description,
            available: (product.available-1)
        };

        this.api.put<void>("products", data).subscribe(
            data => {
                product.available = product.available-1
            },
            error => {
                alert("Je moet ingelogd zijn om een product te kopen")
                console.log(data)
            }
        );
    }
}