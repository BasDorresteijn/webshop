
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Product } from '../../product/product'

export class ListDataSource extends DataSource<any>
{
    constructor(private producten: Product[])
    {
        super();
    }
    
    public connect(): Observable<Product[]>
    {
        return Observable.of(this.producten);
    }

    public disconnect() {}
    
}