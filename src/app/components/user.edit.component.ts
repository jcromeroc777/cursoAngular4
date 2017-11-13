import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user.edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit
{
    public title: string;
    public user: User;
    public status;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    )
    {
        this.title = 'Modificar datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit()
    {
        if(this.identity == null)
            this._router.navigate(['/login']);
        else
        {
            this.user = new User(
                this.identity.sub, 
                this.identity.role,
                this.identity.name,
                this.identity.surname,
                this.identity.email,
                this.identity.password);
        }
        console.log('El componente user.edit.component ha sido cargado');
    }

    onSubmit()
    {
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                this.status = response.status;

                if(this.status != 'success')
                    this.status = 'error';
                else
                    localStorage.setItem('identity',JSON.stringify(this.user));
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}