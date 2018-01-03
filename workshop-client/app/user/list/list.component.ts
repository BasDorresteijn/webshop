
import { Component } from '@angular/core';

import { ListDataSource } from './list.datasource';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'user-list',
    templateUrl: 'app/user/list/list.component.html',
    styleUrls: ['app/user/list/list.component.css'],
})
export class UserListComponent
{
    public displayedColumns = ['fullName', 'emailAddress', 'admin'];
    public dataSource = null;
    private selecteduser : User;
    private selectedfullName : String;
    private admin : Boolean = false;
    
    constructor(private userService: UserService)
    {
        this.getUsersList();
    }
    
    ngOnInit() {
        this.userService.getUpdateViews().subscribe(() => this.getUsersList())
    }

    private getUsersList()
    {
        this.userService.getAllAdmin().subscribe(
            users =>
            {
                this.dataSource = new ListDataSource(users);
            }
        );
    }
    
    public hasData()
    {
        return this.dataSource !== null;
    }

    private showButtons() {
        return this.selecteduser != null
    }

    private selectRow(user: User) {
        this.selecteduser = user;
        this.selectedfullName = user.fullName;
        if(user.roles[1] == "ADMIN") {
            this.admin = true;
        } else {
            this.admin = false;
        }
    }

    private makeAdmin() {
        this.selecteduser.roles = ["GUEST", "ADMIN"]
        this.update()
    }

    private unAdmin() {
        this.selecteduser.roles = ["GUEST"]
        this.update()
    }

    private update() {
        this.userService.update(this.selecteduser.fullName , this.selecteduser)
        this.selecteduser = null;
        this.getUsersList();
        this.getUsersList();
        this.getUsersList();
    }
}
