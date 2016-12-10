import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Observable, AsyncSubject, BehaviorSubject, Subject } from 'rxjs';
import { AuthProvider } from './auth.provider';

import 'expose?jQuery!jquery';
//import '../../../node_modules/signalr/jquery.signalR.js';

import { HubBackend } from './hub/backend/hub.backend';
import { HubConnection } from './hub/connection/hub.connection';
import { SignalrConnect } from './signalr.connect';
import { SignalrConfig } from './signalr.configuration';

declare var jQuery: any;

@Injectable()
export class SignalrEngine {

    constructor(
        protected _connectionBackend: HubBackend) {
        console.log('initializing SignalR');
    }

    public configure(config: SignalrConfig): SignalrConnect {

        this._connectionBackend.configuration = config;
        return new SignalrConnect(this._connectionBackend);
    }


}


export interface ConnectionStatus {
    name: string;
}