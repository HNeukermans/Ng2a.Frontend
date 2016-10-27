import { Injectable, EventEmitter } from '@angular/core';
import { Observable, AsyncSubject, BehaviorSubject, Subject } from 'rxjs';
import { AuthProvider } from './auth.provider';
import { EstablishedConnection } from './established.connection';
import { DefaultSignalrConfig, ServerCallBack, SignalrConfig } from './signalr.config.default';
import 'expose?jQuery!jquery';
import '../../../node_modules/signalr/jquery.signalR.js';

declare var jQuery: any;

@Injectable()
export class SignalRConnection {
    url: string = '';
    serverCallBacks: ServerCallBack[] = [];
    hubName: string = '';
    username: string = '';
    logging: boolean = true;
    error: Observable<any>;
    constructor(config: SignalrConfig) {
        this.url = config.url || '';
        this.hubName = config.hubName || '';
        this.username = config.username;
        this.serverCallBacks = config.serverCallBacks;
        this.logging = config.logging || true;
    }

    public connect(): Observable<EstablishedConnection> {

        let oResult = new AsyncSubject<EstablishedConnection>();
        // create connection object
        let connection = (<any>window).jQuery.hubConnection(this.url);
        connection.logging = this.logging;
        connection.qs = { user: this.username };

        // create a proxy
        let proxy = connection.createHubProxy(this.hubName);

        // wire up server-event handlers
        this.serverCallBacks.forEach(callBack => {
            proxy.on(
                callBack.method,
                function (...args) {
                    console.log('SignalRConnection.proxy.on invoked. Calling server callback next() ...');
                    callBack.next(args);
                    console.log('Server callback next() executed.');
                });
        });

        //start the connection
        console.log('Starting connection ...');
        //create EstablishedConnection before done, to allow replaysubjects to emit all events that occurred priorly. 
        let establischedConnection = new EstablishedConnection(connection, proxy);

        connection.start()
            .done(function () {
                console.log('Connection established, ID: ' + connection.id);
                console.log('Connection established, Transport: ' + connection.transport.name);
                oResult.next(establischedConnection);
                oResult.complete();
            })
            .fail(function (error) {
                console.log('Could not connect');
                oResult.error('Failed to connect. Error: ' + error);
            });
        return oResult;
    }
}

export interface ConnectionStatus {
    name: string;
}