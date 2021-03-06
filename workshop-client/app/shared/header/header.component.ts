
import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthorizationService } from '../authorization.service';
import { User } from '../../user/user';

@Component({
    selector: 'app-header',
    templateUrl: 'app/shared/header/header.component.html',
    styleUrls: ['app/shared/header/header.component.css'],
})
export class HeaderComponent
{
    public authenticated: boolean = false;
    public user?: User;

    constructor(private authService: AuthorizationService, private router: Router)
    {
        this.authenticated = authService.hasAuthorization();
        
        authService.authorized$.subscribe(
            authorized =>
            {
                this.authenticated = authorized;
            }
        );

    }
    
    public goHome()
    {
        this.router.navigate(['']);
    }
    
    public goUsers()
    {
        this.router.navigate(['users']);
    }
    
    public logout()
    {
        this.authService.deleteAuthorization();
        this.goHome();
    }

    public goLogin() {
        this.router.navigate(['login'])
    }

    public goProducts() {
        this.router.navigate(['products'])
    }

    public goCart() {
        this.router.navigate(['cart'])
    }

    public goMe() {
        this.router.navigate(['me'])
    }

    public isadmin() {
        this.user = this.authService.getAuthenticator()
        if(this.user == null) {
            return false;
        }
        if(this.user.roles[1] == "ADMIN") {
            return true;
        }
        else {
            return false;
        }
    }
}
