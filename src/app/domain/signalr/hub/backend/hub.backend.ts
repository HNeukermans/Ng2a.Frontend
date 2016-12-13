import { Observable } from 'rxjs/Observable';
import { HubConnection } from '../connection/hub.connection';
import { SignalrConfig } from '../../signalr.configuration';
import { Injectable } from '@angular/core';
import { HubEventWatcher } from '../hub.event.watcher';


@Injectable()
export abstract class HubBackend {

    public configuration: SignalrConfig;
    public watchers: Array<HubEventWatcher>;
    abstract createConnection(): Observable<HubConnection>;
}

