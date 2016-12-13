import { HubConnection } from './hub.connection';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject, AsyncSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RealHubConnection extends HubConnection {
    
    public status: Observable<{ status: string }>;
    public error: Observable<any>;

    constructor(protected _connection:any, protected _proxy:any) {
        super();
        this.error = this.wireUpErrorsAsObservable();
        this.status = this.wireUpStatusEventsAsObservable();
    }

    public query(method: string, ...parameters: any[]): Observable<any> {
        let sInvoke = new AsyncSubject();
        this._proxy.invoke(method, ...parameters)
            .done(function (...results) {
                sInvoke.next(results);
                sInvoke.complete();
            })
            .fail(function (err) {
                sInvoke.error(err);
            });
        return sInvoke;
    }

    private wireUpErrorsAsObservable(): Observable<any> {
        let sError = new ReplaySubject<any>();
        this._connection.error(function (error) {
            sError.next(error);
        });
        return sError;
    }

    private wireUpStatusEventsAsObservable(): Observable<any> {
        let sStatus = new ReplaySubject<{ status: string, args: any[] }>();
        let connStatusNames = ['starting', 'received', 'connectionSlow', 'reconnecting', 'reconnected', 'stateChanged', 'disconnected'];
        //aggregate all signalr connection status handlers into 1 observable. 
        connStatusNames.forEach((statusName) => {
            //handler wire up, for signalr connection status callback.
            this._connection[statusName]((...args) => {
                sStatus.next({ status: statusName, args: args });
            });
        });
        return sStatus;
    }
}