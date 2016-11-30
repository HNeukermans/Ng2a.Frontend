import { Injectable, EventEmitter } from '@angular/core';
import { Observable, AsyncSubject, ReplaySubject } from 'rxjs';
import { SignalrMessage } from './message';

export class SignalrBackend {

    //can take in MockConnection or nativeConnection
    //can take in MockProxy or naviteProxy
    
    status: Observable<{ status: string }>;
    error: Observable<any>;
    constructor(private connection: any, private proxy: any) {
        this.error = this.wireUpErrorsAsObservable();
        this.status = this.wireUpStatusEventsAsObservable();
    }

    // public get(command: string): Observable<any> {
    //     console.log('EstablishedConnection.sendMessage: ' + message);
    //     return this.remoteInvoke('SendMessage', message.content);
    // }

    // public post(payload: any): Observable<any> {
    //     console.log('EstablishedConnection.sendMessage: ' + message);
    //     return this.remoteInvoke('SendMessage', message.content);
    // }

    public sendMessage(message: SignalrMessage): Observable<any> {
        console.log('EstablishedConnection.sendMessage: ' + message);
        return this.remoteInvoke('SendMessage', message.content);
    }

    public getOtherUsers(): Observable<string> {
        console.log('EstablishedConnection.getOtherUsers: ');
        return this.remoteInvoke('GetOtherUsers').map((args) => <string>args[0]);
    }

    private remoteInvoke(method: string, ...parameters: any[]): Observable<any> {
        let sInvoke = new AsyncSubject();
        this.proxy.invoke(method, ...parameters)
            .done(function (...results) {
                sInvoke.next(results);
                sInvoke.complete();
            })
            .fail(function (err) {
                sInvoke.error(err);
            });
        return sInvoke;
    }


    private wireUpStatusEventsAsObservable(): Observable<any> {
        let sStatus = new ReplaySubject<{ status: string, args: any[] }>();
        let connStatusNames = ['starting', 'received', 'connectionSlow', 'reconnecting', 'reconnected', 'stateChanged', 'disconnected'];
        //aggregate all signalr connection status handlers into 1 observable. 
        connStatusNames.forEach((statusName) => {
            //handler wire up, for signalr connection status callback.
            this.connection[statusName]((...args) => {
                sStatus.next({ status: statusName, args: args });
            });
        });
        return sStatus;
    }

    private wireUpErrorsAsObservable(): Observable<any> {
        let sError = new ReplaySubject<any>();
        this.connection.error(function (error) {
            sError.next(error);
        });
        return sError;
    }
}
