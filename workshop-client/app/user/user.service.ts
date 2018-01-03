
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';

import { User } from './user';
import { EventEmitter } from '@angular/core';

@Injectable()
export class UserService
{

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
    
    public getAll(): Observable<User[]>
    {
        return this.api.get<User[]>('users');
    }

    public getAllAdmin(): Observable<User[]>
    {
        return this.api.get<User[]>('users/admin');
    }
    
    public register(user: User): void
    {
        let data =
        {
            fullName: user.fullName,
            postcode: user.postcode,
            streetnumber: user.streetnumber,
            emailAddress: user.emailAddress,
            password: user.password
        };
        
        this.api.post<void>('users', data).subscribe
        (
            data =>
            {
                this.goHome();
            },
            error =>
            {
                alert('Het registreren is mislukt');
            }
        );
    }
    
    public login(user: User, remember: boolean): void
    {
        this.authService.setAuthorization(user.fullName, user.password);
        
        this.api.get<User>('users/me').subscribe
        (
            authenticator =>
            {
                this.authService.storeAuthorization(authenticator, remember);
                
                this.goHome();
            },
            error =>
            {
                alert('Het inloggen is mislukt');
            }
        );
    }
    
    public logout()
    {
        this.authService.deleteAuthorization();
        
        this.goHome();
    }
    
    private goHome()
    {
        this.router.navigate(['']);
    }

    public getAuth() {
        return this.authService.getAuthenticator()
    }

    public update(fullName : String, user : User) {

        let data =
        {
            fullName: user.fullName,
            postcode: user.postcode,
            streetnumber: user.streetnumber,
            emailAddress: user.emailAddress,
            password: user.password,
            roles: user.roles
        };
        
        this.api.put<void>('users/' + fullName, data).subscribe
        (
            data =>
            {
                this.updateViews.emit();
            },
            error =>
            {
                alert('Het updaten is mislukt');
            }
        );
    }

    public putUser(user : User) {

        let data = 
        {
            fullName: user.fullName,
            postcode: user.postcode,
            streetnumber: user.streetnumber,
            emailAddress: user.emailAddress,
            password: user.password
        }

        this.api.put<void>("users/me", data).subscribe( 
            data => {
                this.login(user, false)
            }
        );
    }
}