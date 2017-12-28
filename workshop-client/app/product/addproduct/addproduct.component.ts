
import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'create-product',
    templateUrl: 'app/product/addproduct/addproduct.component.html',
    styleUrls: ['app/product/addproduct/addproduct.component.css'],
})
export class AddProductComponent
{
    product: Product = new Product();
    addProductForm: FormGroup;
    
    constructor(private productService : ProductService)
    {
        this.addProductForm = new FormGroup({
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
        // this.addProductForm = new FormGroup({
        //     productName: new FormControl(null, [
        //         Validators.required]),
        //     price : new FormControl(null, [
        //         Validators.required]),
        //     description : new FormControl(),
        //     available : new FormControl(null, [
        //         Validators.required])
        // });
    };

    nullValidator(control: AbstractControl) {
        if (control.value != null) {
            return {valid: false }
        }
        return null
    }


    createProduct()
    {
        this.product.price = Math.round(this.product.price * 100) / 100
        this.product.available = Math.round(this.product.available)
        this.productService.create(this.product);
    }
}
