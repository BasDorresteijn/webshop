
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { product } from '../product'

export class ListDataSource extends DataSource<any>
{
    constructor(private producten: product[])
    {
        super();
    }
    
    public connect(): Observable<product[]>
    {
        return Observable.of(this.producten);
    }

    public disconnect() {}
    
}