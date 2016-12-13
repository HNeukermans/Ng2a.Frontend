import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Observable, AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

import 'expose?jQuery!jquery';
//import '../../../node_modules/signalr/jquery.signalR.js';

import { HubBackend } from './hub/backend/hub.backend';
import { HubConnection } from './hub/connection/hub.connection';
import { SignalrConnect } from './signalr.connect';
import { SignalrConfig } from './signalr.configuration';
import { HubEventWatcher } from './hub/hub.event.watcher';
import { RealHubConnection } from './hub/connection/real.hub.connection';
//import { SignalrBackend } from './signalr.backend';
import { SignalrMessage } from './signalr.message';

declare var jQuery: any;

@Injectable()
export class SignalrEngine {

    public static connect: (watchers: Array<HubEventWatcher>, configuration: SignalrConfig) => Promise<HubConnection> = SignalrEngine.createJConnection;

    private static createJConnection(watchers: Array<HubEventWatcher>, configuration: SignalrConfig): Promise<HubConnection> {

        let $promise = new Promise<RealHubConnection>((resolve, reject) => {

            // create connection object
            let jConnection = (<any>window).jQuery.hubConnection(configuration.url);
            jConnection.logging = configuration.logging;
            jConnection.qs = { user: configuration.username };

            // create a proxy
            let jProxy = jConnection.createHubProxy(configuration.hubName);

            // wire up server-event handlers
            watchers.forEach(watcher => {
                jProxy.on(
                    watcher.method,
                    function (...args) {
                        console.log('SignalRConnection.proxy.on invoked. Calling server callback next() ...');
                        watcher.next(args[0]);
                        console.log('Server callback next() executed.');
                    });
            });

            //start the connection
            console.log('Starting connection ...');
            //create EstablishedConnection before done, to allow replaysubjects to emit all events that occurred priorly. 
            let hubConnection = new RealHubConnection(jConnection, jProxy);

            jConnection.start({ withCredentials: false })
                .done(function () {
                    console.log('Connection established, ID: ' + jConnection.id);
                    console.log('Connection established, Transport: ' + jConnection.transport.name);
                    resolve(hubConnection);
                })
                .fail(function (error) {
                    console.log('Could not connect');
                    reject('Failed to connect. Error: ' + error.message); //ex: Error during negotiation request.
                });
        });

        return $promise;
    }
}


export interface ConnectionStatus {
    name: string;
}