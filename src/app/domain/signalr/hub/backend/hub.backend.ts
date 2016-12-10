import { Observable } from 'rxjs/Observable';
import { HubConnection } from '../connection/hub.connection';
import { SignalrConfig } from '../../signalr.configuration';
import { Injectable } from '@angular/core';


@Injectable()
export abstract class HubBackend {

    public configuration: SignalrConfig;
    abstract createConnection(): Observable<HubConnection>;
}

