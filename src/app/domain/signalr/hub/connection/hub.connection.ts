import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SignalrConfig } from '../../signalr.configuration';

@Injectable()
export abstract class HubConnection {
    status: Observable<{ status: string }>;
    error: Observable<any>;
    public abstract query(method: string, ...parameters: any[]): Observable<any>;
} 