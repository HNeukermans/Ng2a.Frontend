import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HubConnectionBackend } from './hub.connnection.backend';
import { MockHubConnection } from '../connection/mock.hub.connection';

@Injectable()
export class MockHubConnectionBackend extends HubConnectionBackend {
     public createConnection(): Observable<MockHubConnection> {
         return null;
     }
}