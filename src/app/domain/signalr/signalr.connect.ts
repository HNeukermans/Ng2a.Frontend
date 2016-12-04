import { HubConnectionBackend } from './hub/connection.backend/hub.connnection.backend';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from './hub/connection/hub.connection';

export class SignalrConnect {
   
    constructor(protected _backend: HubConnectionBackend) {
    }

     public connect(): Observable<HubConnection> {
        return this._backend.createConnection();
    }   
}