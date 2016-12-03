import { RealHubConnection } from './real.connection.backend';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '../connection/hub.connection';

export abstract class HubConnectionBackend {
     abstract createConnection(): Observable<HubConnection>;
}

