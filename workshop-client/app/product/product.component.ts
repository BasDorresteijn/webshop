
import { Component } from '@angular/core';

import { AuthorizationService } from '../shared/authorization.service';

import { User } from '../user/user';
import { Input } from '@angular/core';

@Component({
    selector: 'product',
    templateUrl: 'app/product/product.component.html',
    styleUrls: ['app/product/product.component.css'],
})
export class ProductComponent
{ 
    @Input()
    productnaam: String = "he";

    constructor() {
        console.log(this.productnaam)
    }
}
