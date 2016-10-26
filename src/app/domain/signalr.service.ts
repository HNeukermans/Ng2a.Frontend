import { Injectable, EventEmitter } from '@angular/core';
//import { CONFIGURATION } from '../shared/app.constants';
//import { ChatMessage } from '../models/ChatMessage';
import { Observable, AsyncSubject, BehaviorSubject } from 'rxjs';
import { AuthProvider } from './auth.provider';

declare var $;

@Injectable()
export class SignalRService {

    private proxy;
    private proxyName: string = 'chatAppHub';
    private connection;

    public onMessageReceived: EventEmitter<string>;
    public onNewUserSessionReceived: EventEmitter<string>;
    public newCpuValue: EventEmitter<Number>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExists: Boolean;

    constructor(private _authProvider: AuthProvider) {
        this.onMessageReceived = new EventEmitter<string>();
        this.onNewUserSessionReceived = new EventEmitter<string>();
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.newCpuValue = new EventEmitter<Number>();
        this.connectionExists = false;

        // this.connection = $.hubConnection();
        // this.connection.logging = true;
        // this.proxy = this.connection.createHubProxy(this.proxyName);

        // this.connection.error(function (error) {
        //     console.log('SignalR error: ' + error)
        // });
        //this.registerOnServerEvents();

        //this.startConnection();
    }

    public sendChatMessage(message: string) {

        if (this.connectionExists === false) {
            this.startConnection().subscribe(s => {
                if (s === "connected") {
                    this.proxy.invoke('SendMessage', message);
                }
            });
        } else {
            this.proxy.invoke('SendMessage', message);
        }
    }

    public getUsers(): Observable<Array<string>> {
        console.log('get users...');

        let observable = new AsyncSubject<Array<string>>();
        if (this.connectionExists === false) {
            this.startConnection().subscribe(s => {
                console.log('connected...');
                if (s === "connected") {
                    this.proxy.invoke('GetOtherUsers').done(function (users) {
                        console.log('get users... succeeded' + JSON.stringify(users));
                        observable.next(users);
                        observable.complete();
                    });
                }
            });
        } else {
            this.proxy.invoke('GetOtherUsers').done(function (users) {
                console.log('get users... succeeded' + JSON.stringify(users));
                observable.next(users);
                observable.complete();
            });
        }
        return observable;
    }

    public signalNewUserSession(userName: string) {
        console.log('SignalRService: signalNewUserSession...');

        if (this.connectionExists === false) {
            this.startConnection().subscribe(s => {
                console.log('invoking session...');
                if (s === "connected") {
                    this.proxy.invoke('SignalNewUserSession', userName);
                }
            });
        } else {
            this.proxy.invoke('SignalNewUserSession', userName);
        }
    }

    private startConnection(): Observable<string> {

        let observable = new AsyncSubject<string>();
        let user = this._authProvider.getContext().getCachedUser();
        let username = user ? user.profile.given_name : null;

        if (username == null) {
            observable.error('user is not logged in');
            observable.complete();
        }
        console.log('Trying connection...');
        this.connection.qs = { user: username };
        this.connection.start().done((data) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            observable.next('connected');
            observable.complete();
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error) => {
            //observable.error(error);
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
            observable.error('Could not connect ' + error);
            observable.complete();
        });
        return observable;
    }

    private registerOnServerEvents(): void {
        this.proxy.on('onMessageReceived', (data) => {
            console.log('onMessageReceived ' + data);
            this.onMessageReceived.emit(data);
        });

        this.proxy.on('onNewUserSessionReceived', (data) => {
            console.log('onNewUserSessionReceived ' + data);
            this.onNewUserSessionReceived.emit(data);
        });
    }

    //     this.proxy.on('FoodUpdated', (data) => {
    //         this.foodchanged.emit('this could be data');
    //     });

    //     this.proxy.on('newCpuValue', (data: number) => {
    //         this.newCpuValue.emit(data);
    //     });
    // }
}