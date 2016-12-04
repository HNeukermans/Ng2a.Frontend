import { RealHubConnection } from './real.connection.backend';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '../connection/hub.connection';
import { SignalrConfig } from '../../signalr.configuration';

export abstract class HubConnectionBackend {

     public configuration :  SignalrConfig;
     abstract createConnection(): Observable<HubConnection>;
}

