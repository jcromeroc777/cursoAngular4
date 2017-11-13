import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global';

@Injectable()
export class TaskService
{
    public url: string;

    constructor(private _http: Http)
    {
        this.url = GLOBAL.url;
    }

    saveTask(token, task)
    {
        let json = JSON.stringify(task);
        let parameters = "json="+json+'&authorization='+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/task/new', parameters, {headers: headers})
        .map(res => res.json());
    }

    getTasks(token, page = null)
    {
        let parameters = "authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        if(page == null)
            page = 1;
        
        return this._http.post(this.url+'/task/list?page='+page, parameters, {headers: headers})
        .map(res => res.json());

    }

    getTask(token, id)
    {
        let parameters = "authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/task/detail/'+id, parameters, {headers: headers})
        .map(res => res.json());
    }

    updateTask(token, task, id)
    {
        let json = JSON.stringify(task);
        let parameters = "json="+json+"&authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post(this.url+'/task/edit/'+id, parameters, {headers: headers})
        .map(res => res.json());

    }

    search(token, search = null, filter = null, order = null)
    {
        let parameters = "authorization="+token+"&filter="+filter+"&order="+order;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        let url:string;
        if(search == null)
            url = this.url + '/task/search';
        else
            url = this.url + '/task/search/'+search; 

        return this._http.post(url , parameters, {headers: headers})
            .map(res => res.json());
        
    }

    deleteTask(token, id)
    {
        let parameters = "authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/task/remove/'+id, parameters, {headers: headers})
            .map(res => res.json());

    }
}