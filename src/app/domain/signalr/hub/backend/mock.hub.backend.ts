import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { MockHubConnection } from '../connection/mock.hub.connection';
import { HubBackend } from './hub.backend';
import { HubConnection } from '../connection/hub.connection';

@Injectable()
export class MockHubBackend extends HubBackend {
    public createConnection(): Observable<HubConnection> {
        return Observable.from([new MockHubConnection(this.configuration)]);
    }
}