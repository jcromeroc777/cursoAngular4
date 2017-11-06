import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http)
    {
        this.url = GLOBAL.url;
    }

    signup(usertoLogin)
    {
        let json = JSON.stringify(usertoLogin);
        let parameters = "json=" + json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/login', parameters, {headers: headers})
                                .map(res => res.json());
    }

    getIdentity()
    {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined")
            this.identity = identity;
        else
            this.identity = null;

        return this.identity;
    }

    getToken()
    {
        let token = JSON.parse(localStorage.getItem('token'));

        if(token != "undefined")
            this.token = token;
        else
            this.token = null;

        return this.token;
    }

    register(userToRegister)
    {
        let json = JSON.stringify(userToRegister);
        let parameters = "json="+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/user/new', parameters, {headers: headers})
        .map(res => res.json());
    }
     
}