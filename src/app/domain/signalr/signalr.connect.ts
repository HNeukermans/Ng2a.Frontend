import { Observable } from 'rxjs/Observable';
import { HubConnection } from './hub/connection/hub.connection';
import { HubBackend } from './hub/backend/hub.backend';

export class SignalrConnect {

    constructor(protected _backend: HubBackend) {
    }

    public connect(): Observable<HubConnection> {
        return this._backend.createConnection();
    }
}