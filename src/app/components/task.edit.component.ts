import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
    selector: 'task-edit',
    templateUrl: '../views/task.new.html',
    providers: [UserService, TaskService]
})

export class TaskEditComponent implements OnInit
{
    public pageTitle: string;
    public identity;
    public task: Task;
    public token;
    public statusTask;
    public loading;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _taskService: TaskService
    )
    {
        this.pageTitle = 'Modificar tarea';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit()
    {
        if(this.identity == null && !this.identity.sub)
            this._router.navigate(['/login']);
        else
        {
            //this.task = new Task(1,"","","new","null","null");
            this.getTask();

        }
    }

    onSubmit()
    { 
        this._route.params.forEach((params: Params) => {
            let id = +params['id'];
            this._taskService.updateTask(this.token, this.task, id).subscribe(
                response =>{
                    this.statusTask = response.status;
                    
                    if(this.statusTask != 'success')
                        this.statusTask = 'error';
                    else
                    {
                        this.task = response.data;
                        //this._router.navigate(['/task', this.task.id]);
                        this._router.navigate(['/']);
                    }

                },
                error => {
                    console.log(<any>error);
                }
            );
        }); 
    }

    getTask()
    {
        this.loading = 'show';
        this._route.params.forEach((params: Params) => {
            let id = +params['id'];

            this._taskService.getTask(this.token,id).subscribe(
                response =>{
                    
                    if(response.status == 'success')
                    {
                        if(response.data.user.id == this.identity.sub)
                        {
                            //se puede ver la tarea
                            this.task = response.data;
                            this.loading = 'hiden';
                        }
                        else
                            this._router.navigate(['/']);
                    }
                    else
                        this._router.navigate(['/login']);
                    
    
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }
}