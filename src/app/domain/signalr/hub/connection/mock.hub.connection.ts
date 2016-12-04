import { HubConnection } from './hub.connection';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class MockHubConnection extends HubConnection {
    status: Observable<{ status: string }>;
    error: Observable<any>;

    constructor(protected _connection:any, protected _proxy:any) {
        super();
        this.error = new ReplaySubject<any>();
        this.status = new ReplaySubject<{status:string}>();
    }

    public invoke(method: string, ...parameters: any[]): Observable<any> {
        let sInvoke = new AsyncSubject<any>();
        return sInvoke;
    }

    public mockRespondInvoke(): void {
        let sInvoke = new AsyncSubject<any>();
    }

    public mockRespondStatus(status: string): void {
        let sInvoke = new AsyncSubject<any>();
    }

    public mockRespondError(error: any): void {
        let sInvoke = new AsyncSubject<any>();
   
    }


}