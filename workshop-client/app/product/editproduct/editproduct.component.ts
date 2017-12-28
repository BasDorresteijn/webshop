
import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'edit-product',
    templateUrl: 'app/product/editproduct/editproduct.component.html',
    styleUrls: ['app/product/editproduct/editproduct.component.css'],
})
export class EditProductComponent
{
    productName? : String;
    product?: Product;
    editProductForm: FormGroup;
    
    constructor(private productService : ProductService)
    {
        this.product = productService.getSelectedProduct()
        this.productName = this.product.productName
        this.editProductForm = new FormGroup({
            productName: new FormControl(null, [
                Validators.required]),
            price : new FormControl(null, [
                Validators.required]),
            description : new FormControl(),
            available : new FormControl(null, [
                Validators.required])
        });
    }

    ngOnInit() {

    };

    nullValidator(control: AbstractControl) {
        if (control.value != null) {
            return {valid: false }
        }
        return null
    }


    editProduct()
    {
        this.product.price = Math.round(this.product.price * 100) / 100
        this.product.available = Math.round(this.product.available)
        this.productService.update(this.productName, this.product);
    }
}
