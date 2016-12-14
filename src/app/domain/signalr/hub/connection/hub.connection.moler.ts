import { HubConnection } from './hub.connection';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject, ReplaySubject } from 'rxjs';
import { SignalrConfig } from '../../signalr.configuration';
import { HubEventWatcher } from '../hub.event.watcher';
import { HubConnectionMock } from './hub.connection.mock';

@Injectable()
export class HubConnectionMoler {
    
    watchers: Array<HubEventWatcher>;
    configuration: SignalrConfig;
    connection: HubConnectionMock;

    constructor() {
        
        this.watchers = null;
        this.configuration = null;
        this.connection = new HubConnectionMock();
    }

    public mole(watchers: Array<HubEventWatcher>, config: SignalrConfig) :  Promise<HubConnection> {

        if(watchers == null) throw new Error('Failed to mole. Argument "watchers" can not be null.');
        if(config == null) throw new Error('Failed to mole. Argument "config" can not be null.');
        if((this instanceof HubConnectionMoler) == false) throw new Error('Failed to mole. Context "this" must be instance of HubConnectionMoler. Make sure "this" is correctly assigned by using arrow function (w, c) => i.mole(w,c);');

        console.log('HubConnectionMoler: mole() called, moling the hubconnectionmock...');
        console.log('received watchers: '+ watchers.map((w) => w.method).join(', '));
        this.configuration = config;
        this.watchers = watchers;
        return new Promise<HubConnection>((resolve, reject) => {             
            this.connection = new HubConnectionMock(resolve,reject);
            console.log('HubConnectionMoler: hubconnection moled.');
        });
    }

    // public reject(reason: string) : (watchers: Array<HubEventWatcher>, config: SignalrConfig) => Promise<HubConnection> {
             
    //     return function(watchers: Array<HubEventWatcher>, config: SignalrConfig){
            
    //         this.watchers = watchers;
    //         this.configuration = config;
            
    //         return Promise.reject<HubConnection>(reason);
    //     }        
    // }
}