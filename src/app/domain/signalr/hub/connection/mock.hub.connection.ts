import { HubConnection } from './hub.connection';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject, ReplaySubject } from 'rxjs';
import { SignalrConfig } from '../../signalr.configuration';

@Injectable()
export class MockHubConnection extends HubConnection {
    status: Observable<{ status: string }>;
    error: Observable<any>;

    constructor(configuration: SignalrConfig) {
        super(configuration);
        this.error = new ReplaySubject<any>();
        this.status = new ReplaySubject<{ status: string }>();
    }

    public invoke(method: string, ...parameters: any[]): Observable<any> {
        let sInvoke = new AsyncSubject<any>();
        return sInvoke;
    }

    public mockRespondInvoke(): void {
        let sInvoke = new AsyncSubject<any>();
    }

    public mockHubCallBack(method: string, payload: any) {
        let found = this.configuration.hubCallBacks.find((cb) => cb.method == method);
        if (found) found.next(payload);
    }

    public mockRespondStatus(status: string): void {
        let sInvoke = new AsyncSubject<any>();
    }

    public mockRespondError(error: any): void {
        let sInvoke = new AsyncSubject<any>();

    }


}