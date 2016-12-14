import { HubConnection } from './hub.connection';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject, ReplaySubject, Observer } from 'rxjs';
import { SignalrConfig } from '../../signalr.configuration';
import { HubEventWatcher } from '../hub.event.watcher';
import { RouterStateSnapshot } from '@angular/router';
import { Response } from '@angular/http';

@Injectable()
export class HubConnectionMock extends HubConnection {
    status: Observable<{ status: string }>;
    error: Observable<any>;
    arrangedQueries : Array<ArrangedQuery>;
    arrangedCommands : Array<ArrangedQuery>;
    private _resolverFn : (connection :HubConnection) => void;
    private _rejectFn : (reason:string) => void;

    constructor(resolve : (connection :HubConnection)=>void, reject: (reason:string) => void) {
        super();
        this._resolverFn = resolve;
        this._rejectFn = reject;
        this.error = new ReplaySubject<any>();
        this.status = new ReplaySubject<{ status: string }>();
        this.arrangedQueries = new Array<ArrangedQuery>();
        this.arrangedCommands = new Array<ArrangedQuery>();
    }

    public resolve() {
         this._resolverFn(this);
    }

    public reject(reason: string) {
         this._rejectFn(reason);
    }
  
    public query(method: string): Observable<any> {
        
        if(method == null) throw Error('Failed to query. Argument "method" can not be null.');
        console.log('HubConnectionMock: query called, with argument: ' + method + '...');

        let found = this.arrangedQueries.find((q) => q.method === method);
        //if(!found) throw new Error('Failed to query method "'+ method + '". An arranged query for the given method could not be found. You need to arrange the query first by calling whenQuery(...).');
        return Observable.from([ found ? found.response :  [] ]);
    }
    
    public whenQuery(method : string) : ArrangedQuery  {
        
        let aq = new ArrangedQuery(method);
        this.arrangedQueries.push(aq);
        return aq;
    }

    public command(method: string, payload: any[]): Observable<any> {
        
        if(method == null) throw Error('Failed to command. Argument "method" can not be null.');
        console.log('HubConnectionMock: command called, method: ' + method + '...');

        let found = this.arrangedCommands.find((q) => q.method === method);
        //if(!found) throw new Error('Failed to command "'+ method + '". An arranged command for the given method could not be found. You need to arrange the command first by calling whenCommand(...).');
        return Observable.from([ found ? found.response : [] ]);
    }

    public whenCommand(method : string) : ArrangedQuery  {
        
        let aq = new ArrangedQuery(method);
        this.arrangedCommands.push(aq);
        return aq;
    }

    // public mockHubCallBack(method: string, payload: any) {
    //     //let found = this.configuration.hubCallBacks.find((cb) => cb.method == method);
    //     //if (found) found.next(payload);
    // }

    public mockStatus(status: string): void {
        
        this.status$.next({status : status});
    }

    public mockError(error: any): void {
       
        this.error$.next(error);
    }

    private get error$() : ReplaySubject<any> {
        
        return <ReplaySubject<any>>this.error;
    }

    private get status$() : ReplaySubject<{ status: string }> {
        
        return <ReplaySubject<{ status: string }>>this.status;
    }
}

export class ArrangedQuery {
   
    private _response: any;
    private _method: any;

    public get response() : any {
        return this._response;
    }

     public get method() : any {
        return this._method;
    }


    constructor(method:string) {     
        this._method = method;   
    }

    public respond(response:any){
        this._response = response;
    }
}