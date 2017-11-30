
import { Component } from '@angular/core';

import { AuthorizationService } from '../shared/authorization.service';

import { User } from '../user/user';

@Component({
    selector: 'app-home',
    templateUrl: 'app/bas/bas.component.html',
    styleUrls: ['app/bas/bas.component.css'],
})
export class BasComponent
{
    public authenticated: boolean = false;
    
    public userName = '';

    constructor(private authService: AuthorizationService)
    {
        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );
        
        this.updateAuthentication();
    }
    
    private updateAuthentication()
    {
        this.authenticated = this.authService.hasAuthorization();
        
        if (!this.authenticated)
        {
            this.userName = '';
            
            return;
        }
        
        let user: User = this.authService.getAuthenticator();

        this.userName = user.fullName;
    }
}
