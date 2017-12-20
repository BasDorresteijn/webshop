
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthorizationService } from './authorization.service';

@Injectable()
export class ApiService
{
    constructor(private http: HttpClient, private authService: AuthorizationService)
    {

    }

    // private createQueryString(queryParameters: Object): string
    // {
    //     let queryString = '';
        
    //     if (typeof queryParameters === 'object')
    //     {
    //         for (let key in queryParameters)
    //         {
    //             let value = queryParameters[key];
    //             let prefix = queryString.length === 0 ? '?' : '&';
                
    //             queryString += `${prefix}${key}=${value}`;
    //         }
    //     }
        
    //     return queryString;
    // }

    private createURI(path: string, queryParameters: String): string
    {
        if(queryParameters == null) {
            queryParameters = "";
        }
        return `/api/${path}${queryParameters}`;
    }

    private createRequestHeaders(): HttpHeaders
    {
        let headers = new HttpHeaders();

        if (this.authService.hasAuthorization())
        {
            headers = headers.set('Authorization', this.authService.createAuthorizationString());
        }
        
        return headers;
    }

    public get<T>(path: string, queryParameters?: String): Observable<T>
    {
        let uri = this.createURI(path, queryParameters);
        let headers = this.createRequestHeaders();

        return this.http.get<T>(uri, { headers: headers });
    }

    public post<T>(path: string, data: Object, queryParameters?: String): Observable<T>
    {
        let uri = this.createURI(path, queryParameters);
        let headers = this.createRequestHeaders();

        return this.http.post(uri, data, { headers: headers });
    }

    public put<T>(path: string, data: Object, queryParameters?: String): Observable<T>
    {
        let uri = this.createURI(path, queryParameters);
        let headers = this.createRequestHeaders();

        return this.http.put(uri, data, { headers: headers });
    }

    public delete<T>(path: string, queryParameters?: String): Observable<T>
    {
        let uri = this.createURI(path, queryParameters);
        let headers = this.createRequestHeaders();

        return this.http.delete(uri, { headers: headers });
    }
}
