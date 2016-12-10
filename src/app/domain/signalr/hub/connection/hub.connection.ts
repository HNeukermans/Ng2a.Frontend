import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SignalrConfig } from '../../signalr.configuration';

@Injectable()
export abstract class HubConnection {
    configuration: SignalrConfig;
    status: Observable<{ status: string }>;
    error: Observable<any>;
    public abstract invoke(method: string, ...parameters: any[]): Observable<any>;

    constructor(configuration: SignalrConfig) {
        this.configuration = configuration;
    }
} 