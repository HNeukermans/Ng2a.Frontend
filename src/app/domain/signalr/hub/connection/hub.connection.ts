import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class HubConnection {
    status: Observable<{ status: string }>;
    error: Observable<any>;
    public abstract invoke(method: string, ...parameters: any[]):Observable<any>;
} 