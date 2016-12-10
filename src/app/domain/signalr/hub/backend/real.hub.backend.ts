import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { RealHubConnection } from '../connection/real.hub.connection';
import { SignalrConfig } from '../../signalr/signalr.confguration';
import { HubBackend } from './hub.backend';

@Injectable()
export class RealHubBackend extends HubBackend {

    constructor() {
        super();
    }

    public createConnection(): Observable<RealHubConnection> {

        let oResult = new AsyncSubject<RealHubConnection>();
        // create connection object
        let connection = (<any>window).jQuery.hubConnection(this.configuration.url);
        connection.logging = this.configuration.logging;
        connection.qs = { user: this.configuration.username };

        // create a proxy
        let proxy = connection.createHubProxy(this.configuration.hubName);

        // wire up server-event handlers
        this.configuration.hubCallBacks.forEach(callBack => {
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
        let hubConnection = new RealHubConnection(connection, proxy);

        connection.start({ withCredentials: false })
            .done(function () {
                console.log('Connection established, ID: ' + connection.id);
                console.log('Connection established, Transport: ' + connection.transport.name);
                oResult.next(hubConnection);
                oResult.complete();
            })
            .fail(function (error) {
                console.log('Could not connect');
                oResult.error('Failed to connect. Error: ' + error);
            });
        return oResult;
    }
}